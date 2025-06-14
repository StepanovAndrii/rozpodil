using Rozpodil.Domain.Entities;

namespace Rozpodil.Application.Interfaces.Repositories
{
    public interface IAchievementRepository
    {
        Task<Achievement?> GetByIdAsync(Guid id);
    }
}
