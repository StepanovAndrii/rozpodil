using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Persistence.Configurations
{
    public class UserAchievementConfiguration : IEntityTypeConfiguration<UserAchievement>
    {
        public void Configure(EntityTypeBuilder<UserAchievement> builder)
        {
            builder.HasKey(ua => new { ua.UserId, ua.AchievementId });

            builder.HasOne(ua => ua.User)
                   .WithMany(u => u.UserAchievements)
                   .HasForeignKey(ua => ua.UserId);

            builder.HasOne(ua => ua.Achievement)
                   .WithMany(a => a.UserAchievements)
                   .HasForeignKey(ua => ua.AchievementId);

            builder.Property(ua => ua.UnlockedAt)
                   .IsRequired();
        }
    }
}
