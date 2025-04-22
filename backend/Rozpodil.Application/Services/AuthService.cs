using AutoMapper;
using Rozpodil.Application.Abstracts;
using Rozpodil.Application.Common;
using Rozpodil.Application.Common.Interfaces;
using Rozpodil.Application.Common.Utilities;
using Rozpodil.Application.Interfaces;
using Rozpodil.Application.Models;
using Rozpodil.Application.Services.Interfaces;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITransactionManager _transactionManager;
        private readonly IMapper _mapper;
        IEmailVerificationService _emailVerificationService;

        public AuthService(
            IUnitOfWork unitOfWork,
            ITransactionManager transactionManager,
            IMapper mapper,
            IEmailVerificationService emailVerificationService
            )
        {
            _unitOfWork = unitOfWork;
            _transactionManager = transactionManager;
            _mapper = mapper;
            _emailVerificationService = emailVerificationService;
        }

        public async Task<Result<ErrorType>> RegisterUser(UserModel userModel, UserCredentialsModel userCredentialsModel)
        {
            bool userExists = await _unitOfWork.UserCredentialsRepository.ExistsByEmailAsync(userCredentialsModel.Email);

            if (userExists)
            {
                return Result<ErrorType>.Fail(ErrorType.Conflict);
            }

            await _transactionManager.ExecuteInTransactionAsync(
                async () =>
                {
                    User user = _mapper.Map<User>(userModel);
                    UserCredentials userCredentials = _mapper.Map<UserCredentials>(userCredentialsModel);

                    user.Credentials = userCredentials;

                    await _unitOfWork.UserRepository.CreateUserAsync(user);

                    var generationCodeResult = await GenerateUniqueCodeAsync();

                    TwoFactorCode twoFactorCode = new TwoFactorCode
                    {
                        HashedCode = generationCodeResult.Hash,
                        ExpiresAt = DateTime.UtcNow.AddMinutes(5),
                        User = user
                    };

                    await _unitOfWork.TwoFactorCodeRepository.SaveTwoFactorCodeAsync(twoFactorCode);
                    await _unitOfWork.SaveChangesAsync();

                    await _emailVerificationService.SendVerificationCodeAsync(userCredentials.Email, generationCodeResult.Code);
                }
            );

            return Result<ErrorType>.Ok();
        }

        public async Task<Result<ErrorType>> VerifyEmailAsync(EmailVerificationModel emailVerificationModel)
        {
            Console.WriteLine("зайшов в метод верифікації емейлу");
            var codeFromUser = emailVerificationModel.Code;
            var activeCodes = await _unitOfWork.TwoFactorCodeRepository.GetActiveCodesAsync();
            var matchedCode = activeCodes.FirstOrDefault(
                code => BCrypt.Net.BCrypt.Verify(codeFromUser, code.HashedCode)
            );

            if (matchedCode != null)
            {
                await _transactionManager.ExecuteInTransactionAsync(
                    async () =>
                    {
                        await _unitOfWork.TwoFactorCodeRepository.RemoveTwoFactorCodeAsync(matchedCode);
                        await _unitOfWork.UserRepository.MarkEmailAsVerifiedAsync(matchedCode.UserId);
                        await _unitOfWork.SaveChangesAsync();
                    }
                );

                return Result<ErrorType>.Ok();
            }
            
            return Result<ErrorType>.Fail(ErrorType.BadRequest);
        }

        private async Task<(string Code, string Hash)> GenerateUniqueCodeAsync(int length = 6)
        {
            string code;
            string hash;

            do
            {
                code = SecureCodeGenerator.GenerateSecureCode(length);
                hash = BCrypt.Net.BCrypt.HashPassword(code);
            } while (
                await _unitOfWork.TwoFactorCodeRepository.TwoFactorCodeExistsAsync(hash)
            );

            return (code, hash);
        }
    }
}
