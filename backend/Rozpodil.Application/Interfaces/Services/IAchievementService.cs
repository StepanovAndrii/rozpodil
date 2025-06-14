using Rozpodil.Domain.Entities;

namespace Rozpodil.Application.Interfaces.Services
{
    public interface IAchievementService
    {
        Task GrantAchievementAsync(Guid userId, Guid achievementId);
    }
}
