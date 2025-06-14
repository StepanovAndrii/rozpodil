using Rozpodil.Application.Commands;
using Rozpodil.Application.Common;
using Rozpodil.Application.Models;

namespace Rozpodil.Application.Interfaces.Auth
{
    public interface IOAuthService
    {
        Task<Result<AccessTokenModel, ErrorType>> AuthenticateExternalUserAsync(ExternalAuthenticationCommand externalAuthenticationCommand);
    }
}
