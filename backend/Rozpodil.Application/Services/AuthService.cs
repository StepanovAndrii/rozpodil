using AutoMapper;
using Rozpodil.Application.Common;
using Rozpodil.Application.Common.Interfaces;
using Rozpodil.Application.Common.Utilities;
using Rozpodil.Application.Interfaces.Security;
using Rozpodil.Application.Models;
using Rozpodil.Domain.Entities;
using Rozpodil.Application.Common.Enums;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Interfaces.Auth.AuthContext;
using Rozpodil.Application.Interfaces.Auth;
using Rozpodil.Application.Interfaces.Repositories;

namespace Rozpodil.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITransactionManager _transactionManager;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailVerificationService;
        private readonly IHasherService _hasherService;
        private readonly ICodeGeneratorService _verificationCodeGeneratorService;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IRefreshTokenService _refreshTokenService;
        private readonly ICookieService _cookieService;

        public AuthService(
                IUnitOfWork unitOfWork,
                ITransactionManager transactionManager,
                IMapper mapper,
                IEmailService emailVerificationService,
                IHasherFactory hasherFactory,
                ICodeGeneratorService verificationCodeGeneratorService,
                IJwtTokenService jwtTokenService,
                IRefreshTokenService refreshTokenService,
                ICookieService cookieService
            )
        {
            _unitOfWork = unitOfWork;
            _transactionManager = transactionManager;
            _mapper = mapper;
            _emailVerificationService = emailVerificationService;
            _hasherService = hasherFactory.GetHasher(HasherType.Bcrypt);
            _verificationCodeGeneratorService = verificationCodeGeneratorService;
            _jwtTokenService = jwtTokenService;
            _refreshTokenService = refreshTokenService;
            _cookieService = cookieService;
        }

        public async Task<Result<ErrorType>> RegisterUser(
                RegisterUserCommand registerUserCommand
            )
        {
            var userCredentialsModel = _mapper.Map<UserCredentialsModel>(registerUserCommand);
            var existingUser = await _unitOfWork.UserCredentialsRepository.GetUserByEmailAsync(userCredentialsModel.Email);

            if (existingUser != null)
            {
                if (existingUser.IsEmailConfirmed)
                    return Result<ErrorType>.Fail(ErrorType.Conflict);

                return await HandleExistingUnconfirmedUser(existingUser);
            }

            return await CreateNewUserAsync(registerUserCommand);
        }

        public async Task<Result<AccessTokenModel, ErrorType>> LoginUserAsync(
            LoginCommand loginCommand,
            int refreshExpiresAtDays)
        {
            var loginModel = _mapper.Map<LoginModel>(loginCommand);

            var userCredentials = await _unitOfWork.UserCredentialsRepository.GetUserCredentialsByEmailAsync(loginModel.Email);

            if (userCredentials == null)
                return Result<AccessTokenModel, ErrorType>.Fail(ErrorType.Unauthorized);

            if (userCredentials.HashedPassword == null || !_hasherService.Verify(loginModel.Password, userCredentials.HashedPassword))
                return Result<AccessTokenModel, ErrorType>.Fail(ErrorType.Unauthorized);

           
            var accessToken = _jwtTokenService.GenerateToken(userCredentials.UserId);

            var existingRefreshToken = await _unitOfWork.RefreshTokenRepository.GetHashedTokenByIdASync(userCredentials.UserId);

            // TODO: змінити логіку
            if (existingRefreshToken != null)
               await _unitOfWork.RefreshTokenRepository.DeleteRefreshToken(existingRefreshToken);

            string refreshToken = await _refreshTokenService.GenerateAsync(userCredentials.UserId, refreshExpiresAtDays);

            _cookieService.SetRefreshToken(refreshToken, refreshExpiresAtDays);

            return Result<AccessTokenModel, ErrorType>.Ok(
                new AccessTokenModel
                {
                    AccessToken = accessToken
                }    
            );
        }

        public async Task<Result<ErrorType>> ResendEmailVerificationCode(ResendEmailConfirmationCodeCommand resendEmailConfirmationCodeCommand)
        {
            var resendEmailVerificationModel = _mapper.Map<ResendEmailVerificationCodeModel>(resendEmailConfirmationCodeCommand);

            var user = await _unitOfWork.UserCredentialsRepository
                .GetUserByEmailAsync(resendEmailVerificationModel.Email);

            if (user != null)
            {
                try
                {
                    await _transactionManager.ExecuteInTransactionAsync(
                        async () =>
                        {
                            await _unitOfWork.TwoFactorCodeRepository.DeleteTwoFactorCodeByUserIdAsync(user.Id);
                            await GenerateAndSendVerificationCodeAsync(user);
                            await _unitOfWork.SaveChangesAsync();
                        }
                    );
                }
                catch (Exception)
                {
                    return Result<ErrorType>.Fail(ErrorType.Internal);
                }
            }

            return Result<ErrorType>.Ok();
        }

        public async Task<Result<AccessTokenModel, ErrorType>> VerifyEmailAndLoginAsync(
                EmailConfirmationCommand emailVerificationCommand,
                int refreshTokenLifetimeDays
            )
        {
            var emailVerificationModel = _mapper.Map<EmailVerificationModel>(emailVerificationCommand);
            var codeFromUser = emailVerificationModel.Code;
            var activeCodes = await _unitOfWork.TwoFactorCodeRepository.GetActiveCodesAsync();
            var matchedCode = activeCodes.FirstOrDefault(
                code => _hasherService.Verify(codeFromUser, code.HashedCode)
            );

            if (matchedCode == null)
                return Result<AccessTokenModel, ErrorType>.Fail(ErrorType.BadRequest);

            await _transactionManager.ExecuteInTransactionAsync(async () =>
            {
                await _unitOfWork.TwoFactorCodeRepository.DeleteTwoFactorCode(matchedCode);
                await _unitOfWork.UserRepository.MarkEmailAsVerifiedAsync(matchedCode.UserId);
                await _unitOfWork.SaveChangesAsync();
            });

            var accessToken = _jwtTokenService.GenerateToken(matchedCode.UserId);
            var refreshToken = await _refreshTokenService.GenerateAsync(matchedCode.UserId, refreshTokenLifetimeDays);

            _cookieService.SetRefreshToken(refreshToken, refreshTokenLifetimeDays);

            return Result<AccessTokenModel, ErrorType>.Ok(
                new AccessTokenModel
                {
                    AccessToken = accessToken,
                }
            );
        }

        private async Task<Result<ErrorType>> CreateNewUserAsync(RegisterUserCommand registerUserCommand)
        {
            var userId = GuidGenerator.Generate();

            var userModel = _mapper.Map<UserModel>(registerUserCommand);
            userModel.Id = userId;
            userModel.IsEmailConfirmed = false;

            var userCredentialsModel = _mapper.Map<UserCredentialsModel>(registerUserCommand);
            userCredentialsModel.UserId = userId;
            userCredentialsModel.HashedPassword = _hasherService.Hash(registerUserCommand.Password);

            try
            {
                await _transactionManager.ExecuteInTransactionAsync(async () =>
                {
                    var user = _mapper.Map<User>(userModel);
                    var userCredentials = _mapper.Map<UserCredentials>(userCredentialsModel);

                    user.Credentials = userCredentials;

                    await _unitOfWork.UserRepository.CreateUserAsync(user);
                    await GenerateAndSendVerificationCodeAsync(user);
                    await _unitOfWork.SaveChangesAsync();
                });
            }
            catch
            {
                return Result<ErrorType>.Fail(ErrorType.Internal);
            }

            return Result<ErrorType>.Ok();
        }

        private async Task<Result<ErrorType>> HandleExistingUnconfirmedUser(User existingUser)
        {
            var twoFactorCode = await _unitOfWork.TwoFactorCodeRepository.GetTwoFactorCodeByUserIdAsync(existingUser.Id);
            var timeLeft = twoFactorCode?.ExpiresAt - DateTime.UtcNow;

            if (timeLeft == null || timeLeft < TimeSpan.FromMinutes(1))
            {
                try
                {
                    await _transactionManager.ExecuteInTransactionAsync(async () =>
                    {
                        await GenerateAndSendVerificationCodeAsync(existingUser);
                        await _unitOfWork.SaveChangesAsync();
                    });
                }
                catch
                {
                    return Result<ErrorType>.Fail(ErrorType.Internal);
                }
            }

            return Result<ErrorType>.Ok();
        }
        
        private async Task GenerateAndSendVerificationCodeAsync(User user)
        {
            var generationCodeResult = await GenerateUniqueCodeAsync();

            // TODO: створити Domain-фабрику
            TwoFactorCode twoFactorCode = new TwoFactorCode
            {
                HashedCode = generationCodeResult.Hash,
                ExpiresAt = DateTime.UtcNow.AddMinutes(5),
                User = user
            };

            await _unitOfWork.TwoFactorCodeRepository.CreateTwoFactorCodeAsync(twoFactorCode);
            await _emailVerificationService.SendVerificationCodeAsync(
                "Code verification",
                user.Credentials.Email,
                generationCodeResult.Code
            );
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
