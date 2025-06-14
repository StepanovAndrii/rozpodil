using Microsoft.AspNetCore.SignalR;

namespace Rozpodil.Infrastructure.Hubs
{
    public class AchievementsHub : Hub
    {
        public async Task NotifyAchievement(string userId, string achievementName)
        {
            await Clients.User(userId).SendAsync("ReceiveAchievement", achievementName);
        }

        public async Task NotifyAllUsers(string achievementName)
        {
            await Clients.All.SendAsync("ReceiveAchievement", achievementName);
        }
    }
}
