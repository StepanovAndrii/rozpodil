using Microsoft.AspNetCore.Authentication.BearerToken;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Common;
using Rozpodil.Application.Models;

namespace Rozpodil.Application.Interfaces.Auth
{
    public interface IAuthService
    {
        Task<Result<ErrorType>> RegisterUser(RegisterUserCommand registerUserCommand);
        Task<Result<AccessTokenModel, ErrorType>> VerifyEmailAndLoginAsync(
            EmailConfirmationCommand emailVerificationCommand,
            int refreshTokenLifetimeDays
        );
        Task<Result<ErrorType>> ResendEmailVerificationCode(ResendEmailConfirmationCodeCommand resendEmailConfirmationCodeCommand);
    }
}