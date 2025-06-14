using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Rozpodil.Domain.Entities;
using System.Reflection.Emit;

namespace Rozpodil.Persistence.Configurations
{
    public class AchievementConfiguration : IEntityTypeConfiguration<Achievement>
    {
        public void Configure(EntityTypeBuilder<Achievement> builder)
        {
            builder.HasKey(a => a.Id);
            builder.Property(a => a.Title).IsRequired().HasMaxLength(100);
            builder.Property(a => a.Description).HasMaxLength(500);

            builder.HasMany(a => a.UserAchievements)
                   .WithOne(ua => ua.Achievement)
                   .HasForeignKey(ua => ua.AchievementId);
        }
    }
}
