
using Rozpodil.Application.Common;
using Rozpodil.Application.Models;

namespace Rozpodil.Application.Interfaces
{
    public interface ITokenManager
    {
        Task<Result<AccessTokenModel, ErrorType>> RefreshToken(string refreshToken);
    }
}
