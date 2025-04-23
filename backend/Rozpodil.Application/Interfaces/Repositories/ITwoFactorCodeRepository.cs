using Rozpodil.Domain.Entities;

namespace Rozpodil.Persistence.Repository
{
    public interface ITwoFactorCodeRepository
    {
        Task<TwoFactorCode> CreateTwoFactorCodeAsync(TwoFactorCode twoFactorCode);
        Task<bool> TwoFactorCodeExistsAsync(string code);
        Task RemoveTwoFactorCodeAsync(TwoFactorCode twoFactorCode);
        Task<IList<TwoFactorCode>> GetActiveCodesAsync(); 
    }
}