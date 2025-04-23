using Microsoft.EntityFrameworkCore;
using Rozpodil.Application.Interfaces.Repositories;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Persistence.Repository
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly DatabaseContext _context;

        public RefreshTokenRepository(
                DatabaseContext context
            )
        {
            _context = context;
        }
        public async Task<RefreshToken> CreateAsync(RefreshToken refreshToken)
        {
            await _context.RefreshTokens.AddAsync(refreshToken);
            return refreshToken;
        }

        public async Task<RefreshToken?> GetByHashedTokenAsync(string hashedToken)
        {
            return await _context.RefreshTokens.FirstOrDefaultAsync(
                refreshToken => refreshToken.HashedToken == hashedToken
            );
        }

        public async Task<RefreshToken?> GetByUserId(Guid userId)
        {
            return await _context.RefreshTokens.FirstOrDefaultAsync(
                refreshToken => refreshToken.UserId == userId
            );
        }
    }
}
