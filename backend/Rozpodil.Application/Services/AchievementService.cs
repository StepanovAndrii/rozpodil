using MediatR;
using Rozpodil.Application.Interfaces.Repositories;
using Rozpodil.Application.Interfaces.Services;
using Rozpodil.Domain.Entities;
using Rozpodil.Domain.Events;
using Rozpodil.Domain.Repositories;

namespace Rozpodil.Application.Services
{
    public class AchievementService : IAchievementService
    {
        private readonly IUserRepository _userRepository;
        private readonly IAchievementRepository _achievementRepository;
        private readonly IMediator _mediator;

        public AchievementService(
            IUserRepository userRepository,
            IAchievementRepository achievementRepository,
            IMediator mediator)
        {
            _userRepository = userRepository;
            _achievementRepository = achievementRepository;
            _mediator = mediator;
        }

        public async Task GrantAchievementAsync(Guid userId, Guid achievementId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            var achievement = await _achievementRepository.GetByIdAsync(achievementId);

            if (user == null || achievement == null)
                throw new Exception("User or achievement not found.");

            if (user.UserAchievements.Any(ua => ua.AchievementId == achievementId))
                return;

            var userAchievement = new UserAchievement
            {
                UserId = userId,
                AchievementId = achievementId,
                UnlockedAt = DateTime.UtcNow
            };

            user.UserAchievements.Add(userAchievement);
            await _userRepository.UpdateAsync(user);

            await _mediator.Publish(new AchievementUnlockedEvent(userId, achievement.Name));
        }
    }
}
