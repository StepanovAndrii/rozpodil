using AutoMapper;
using Rozpodil.Application.Abstracts;
using Rozpodil.Application.Common;
using Rozpodil.Application.Common.Interfaces;
using Rozpodil.Application.Common.Utilities;
using Rozpodil.Application.Interfaces;
using Rozpodil.Application.Interfaces.IHasher;
using Rozpodil.Application.Models;
using Rozpodil.Domain.Entities;
using Rozpodil.Application.Common.Enums;
using Rozpodil.Application.Commands;

namespace Rozpodil.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITransactionManager _transactionManager;
        private readonly IMapper _mapper;
        private readonly IEmailVerificationService _emailVerificationService;
        private readonly IHasherService _hasherService;
        private readonly IVerificationCodeGeneratorService _verificationCodeGeneratorService;

        public AuthService(
            IUnitOfWork unitOfWork,
            ITransactionManager transactionManager,
            IMapper mapper,
            IEmailVerificationService emailVerificationService,
            IHasherFactory hasherFactory,
            IVerificationCodeGeneratorService verificationCodeGeneratorService
            )
        {
            _unitOfWork = unitOfWork;
            _transactionManager = transactionManager;
            _mapper = mapper;
            _emailVerificationService = emailVerificationService;
            _hasherService = hasherFactory.GetHasher(HasherType.Bcrypt);
            _verificationCodeGeneratorService = verificationCodeGeneratorService;
        }

        public async Task<Result<ErrorType>> RegisterUser(
                RegisterUserCommand registerUserCommand
            )
        {
            var userCredentialsModel = _mapper.Map<UserCredentialsModel>(registerUserCommand);

            bool userExists = await _unitOfWork.UserCredentialsRepository.ExistsByEmailAsync(userCredentialsModel.Email);

            if (userExists)
            {
                return Result<ErrorType>.Fail(ErrorType.Conflict);
            }

            var userModel = _mapper.Map<UserModel>(registerUserCommand);

            var userId = GuidGenerator.Generate();
            
            userModel.Id = userId;
            userModel.IsEmailConfirmed = false;

            userCredentialsModel.UserId = userId;
            userCredentialsModel.HashedPassword = _hasherService.Hash(registerUserCommand.Password);

            await _transactionManager.ExecuteInTransactionAsync(
                async () =>
                {
                    User user = _mapper.Map<User>(userModel);
                    UserCredentials userCredentials = _mapper.Map<UserCredentials>(userCredentialsModel);

                    user.Credentials = userCredentials;

                    await _unitOfWork.UserRepository.CreateUserAsync(user);

                    var generationCodeResult = await GenerateUniqueCodeAsync();

                    // TODO: створити Domain-фабрику
                    TwoFactorCode twoFactorCode = new TwoFactorCode
                    {
                        HashedCode = generationCodeResult.Hash,
                        ExpiresAt = DateTime.UtcNow.AddMinutes(5),
                        User = user
                    };

                    await _unitOfWork.TwoFactorCodeRepository.CreateTwoFactorCodeAsync(twoFactorCode);
                    await _unitOfWork.SaveChangesAsync();

                    await _emailVerificationService.SendVerificationCodeAsync(userCredentials.Email, generationCodeResult.Code);
                }
            );

            return Result<ErrorType>.Ok();
        }

        public async Task<Result<Guid, ErrorType>> VerifyEmailAsync(EmailVerificationModel emailVerificationModel)
        {
            var codeFromUser = emailVerificationModel.Code;
            var activeCodes = await _unitOfWork.TwoFactorCodeRepository.GetActiveCodesAsync();
            var matchedCode = activeCodes.FirstOrDefault(
                code => _hasherService.Verify(codeFromUser, code.HashedCode)
            );

            if (matchedCode != null)
            {
                await _transactionManager.ExecuteInTransactionAsync(
                    async () =>
                    {
                        await _unitOfWork.TwoFactorCodeRepository.DeleteTwoFactorCodeAsync(matchedCode);
                        await _unitOfWork.UserRepository.MarkEmailAsVerifiedAsync(matchedCode.UserId);
                        await _unitOfWork.SaveChangesAsync();
                    }
                );

                return Result<Guid, ErrorType>.Ok(matchedCode.UserId);
            }
            
            return Result<Guid, ErrorType>.Fail(ErrorType.BadRequest);
        }

        private async Task<(string Code, string Hash)> GenerateUniqueCodeAsync(int length = 6)
        {
            string code;
            string hash;

            do
            {
                code = _verificationCodeGeneratorService.GenerateCode(length);
                hash = _hasherService.Hash(code);
            } while (
                await _unitOfWork.TwoFactorCodeRepository.TwoFactorCodeExistsAsync(hash)
            );

            return (code, hash);
        }
    }
}
