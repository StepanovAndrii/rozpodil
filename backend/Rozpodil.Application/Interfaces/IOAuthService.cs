using Rozpodil.Application.Commands;
using Rozpodil.Application.Common;
using Rozpodil.Application.Common.Enums;
using Rozpodil.Application.Models;

namespace Rozpodil.Application.Interfaces
{
    public interface IOAuthService
    {
        Task<Result<AccessTokenModel, ErrorType>> AuthenticateExternalUserAsync(ExternalAuthenticationCommand externalAuthenticationCommand);
        OAuthProvider GetOAuthProvider(string provider);
    }
}
