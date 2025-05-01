using Rozpodil.Domain.Entities;

namespace Rozpodil.Persistence.Repository
{
    public interface ITwoFactorCodeRepository
    {
        Task<TwoFactorCode> CreateTwoFactorCodeAsync(TwoFactorCode twoFactorCode);
        Task<bool> TwoFactorCodeExistsAsync(string code);
        Task DeleteTwoFactorCode(TwoFactorCode twoFactorCode);
        Task DeleteTwoFactorCodeByIdAsync(Guid userId);
        Task<IList<TwoFactorCode>> GetActiveCodesAsync();
        Task DeleteExpiredCodeAsync(CancellationToken cancellationToken);
    }
}