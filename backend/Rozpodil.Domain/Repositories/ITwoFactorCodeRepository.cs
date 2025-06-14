using Rozpodil.Domain.Entities;

namespace Rozpodil.Persistence.Repository
{
    public interface ITwoFactorCodeRepository
    {
        Task<TwoFactorCode> CreateTwoFactorCodeAsync(TwoFactorCode twoFactorCode);
        Task<bool> TwoFactorCodeExistsAsync(string code);
        Task DeleteTwoFactorCode(TwoFactorCode twoFactorCode);
        Task DeleteTwoFactorCodeByUserIdAsync(Guid userId);
        Task<IList<TwoFactorCode>> GetActiveCodesAsync();
        Task DeleteExpiredCodeAsync(CancellationToken cancellationToken);
        Task<TwoFactorCode?> GetTwoFactorCodeByUserIdAsync(Guid userId);
    }
}