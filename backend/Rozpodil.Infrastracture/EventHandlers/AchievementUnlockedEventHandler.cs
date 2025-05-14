using MediatR;
using Microsoft.AspNetCore.SignalR;
using Rozpodil.Domain.Events;
using Rozpodil.Infrastructure.Hubs;

namespace Rozpodil.Infrastructure.EventHandlers
{
    public class AchievementUnlockedEventHandler : INotificationHandler<AchievementUnlockedEvent>
    {
        private readonly IHubContext<AchievementsHub> _hubContext;

        public AchievementUnlockedEventHandler(IHubContext<AchievementsHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task Handle(AchievementUnlockedEvent notification, CancellationToken cancellationToken)
        {
            await _hubContext.Clients.User(notification.UserId.ToString())
                .SendAsync("ReceiveAchievement", notification.AchievementName, cancellationToken);
        }
    }
}
