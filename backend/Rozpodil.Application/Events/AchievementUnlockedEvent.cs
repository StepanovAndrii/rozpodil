using MediatR;

namespace Rozpodil.Domain.Events
{
    public class AchievementUnlockedEvent : INotification
    {
        public Guid UserId { get; }
        public string AchievementName { get; }

        public AchievementUnlockedEvent(Guid userId, string achievementName)
        {
            UserId = userId;
            AchievementName = achievementName;
        }
    }
}
