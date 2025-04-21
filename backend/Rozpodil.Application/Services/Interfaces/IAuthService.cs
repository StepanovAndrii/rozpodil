using Rozpodil.Application.Common;
using Rozpodil.Application.Models;

namespace Rozpodil.Application.Services.Interfaces
{
    public interface IAuthService
    {
        Task<Result<ErrorType>> RegisterUser(UserModel userModel, UserCredentialsModel userCredentialsModel);
        Task<Result<ErrorType>> VerifyEmailAsync(EmailVerificationModel emailVerificationModel);
    }
}