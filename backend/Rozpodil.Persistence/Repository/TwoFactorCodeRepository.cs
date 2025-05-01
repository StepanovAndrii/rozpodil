using Microsoft.EntityFrameworkCore;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Persistence.Repository
{
    public class TwoFactorCodeRepository : ITwoFactorCodeRepository
    {
        private readonly DatabaseContext _context;

        public TwoFactorCodeRepository(
            DatabaseContext context
            )
        {
            _context = context;
        }

        public async Task<TwoFactorCode> CreateTwoFactorCodeAsync(TwoFactorCode twoFactorCode)
        {
            await _context.TwoFactorCodes.AddAsync(twoFactorCode);
            return twoFactorCode;
        }

        public async Task<bool> TwoFactorCodeExistsAsync(string hashedCode)
        {
            return await _context.TwoFactorCodes.AnyAsync(
                twoFactorCode => twoFactorCode.HashedCode == hashedCode
            );
        }

        public Task DeleteTwoFactorCode(TwoFactorCode twoFactorCode)
        {
            _context.TwoFactorCodes.Remove(twoFactorCode);
            return Task.CompletedTask;
        }

        public async Task<IList<TwoFactorCode>> GetActiveCodesAsync()
        {
            return await _context.TwoFactorCodes.Where(
                code => code.ExpiresAt > DateTime.UtcNow
            ).ToListAsync();
        }

        public async Task DeleteExpiredCodeAsync(CancellationToken cancellationToken)
        {
            var expiredCodes = await _context.TwoFactorCodes
                .Where(twoFactorCode => twoFactorCode.ExpiresAt < DateTime.UtcNow)
                .ToListAsync();

            if (expiredCodes.Any())
            {
                _context.TwoFactorCodes.RemoveRange(expiredCodes);
            }
        }

        public async Task DeleteTwoFactorCodeByIdAsync(Guid userId)
        {
            var twoFactorCode = await _context.TwoFactorCodes
                .FindAsync(userId);

            if(twoFactorCode != null)
            {
                _context.TwoFactorCodes.Remove(twoFactorCode);
            }
        }
    }
}
