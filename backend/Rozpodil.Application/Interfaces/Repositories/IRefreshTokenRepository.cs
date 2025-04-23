using Rozpodil.Domain.Entities;

namespace Rozpodil.Application.Interfaces.Repositories
{
    public interface IRefreshTokenRepository
    {
        Task<RefreshToken> CreateAsync(RefreshToken refreshToken);
        Task<RefreshToken?> GetByHashedTokenAsync(string hashedToken);
        Task<RefreshToken?> GetByUserId(Guid userId);
    }
}
