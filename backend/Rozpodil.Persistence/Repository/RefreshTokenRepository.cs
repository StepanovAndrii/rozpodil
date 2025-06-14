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

        // TODO: в деяких репозиторіях IList, в деяких List і тд. Змінити
        public async Task<RefreshToken> CreateAsync(RefreshToken refreshToken)
        {
            await _context.RefreshTokens.AddAsync(refreshToken);
            return refreshToken;
        }

        public async Task<RefreshToken?> GetByHashedTokenAsync(string hashedToken)
        {
            return await _context.RefreshTokens
                .Include(refreshToken => refreshToken.User)
                .FirstOrDefaultAsync(
                    refreshToken => refreshToken.HashedToken == hashedToken
            );
        }

        public async Task<User?> GetUserByHashedTokenAsync(string hashedToken)
        {
            return await _context.RefreshTokens
                .Where(refreshToken => refreshToken.HashedToken == hashedToken)
                .Select(refreshToken => refreshToken.User)
                .FirstOrDefaultAsync();
        }

        public Task DeleteRefreshToken(RefreshToken refreshToken)
        {
            _context.RefreshTokens.Remove(refreshToken);

            return Task.CompletedTask;
        }

        public async Task<RefreshToken?> GetHashedTokenByIdASync(Guid userId)
        {
           return await _context.RefreshTokens
                .FindAsync(userId);
        }
    }
}
