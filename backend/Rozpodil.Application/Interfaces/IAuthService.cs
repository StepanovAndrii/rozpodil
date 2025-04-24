using Rozpodil.Application.Commands;
using Rozpodil.Application.Common;
using Rozpodil.Application.Models;

namespace Rozpodil.Application.Interfaces
{
    public interface IAuthService
    {
        Task<Result<ErrorType>> RegisterUser(RegisterUserCommand registerUserCommand);
        Task<Result<Guid, ErrorType>> VerifyEmailAsync(EmailVerificationModel emailVerificationModel);
    }
}