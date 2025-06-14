namespace Rozpodil.Domain.Entities
{
    public class Achievement
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }

        public ICollection<UserAchievement> UserAchievements { get; set; } = new List<UserAchievement>();
    }
}
