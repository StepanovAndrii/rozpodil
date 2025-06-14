using Microsoft.EntityFrameworkCore;
using Rozpodil.Domain.Entities;
using Rozpodil.Persistence.Configurations;
using Rozpodil.Persistence.Converters;

namespace Rozpodil.Persistence
{
    public class DatabaseContext : DbContext
    {
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<TwoFactorCode> TwoFactorCodes { get; set; }
        public DbSet<UserCredentials> UsersCredentials { get; set; }
        public DbSet<RoomUser> RoomUsers { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Achievement> Achievements { get; set; }
        public DbSet<UserAchievement> UserAchievements { get; set; }

        public DatabaseContext(
            DbContextOptions<DatabaseContext> options
        ) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(UserCredentialsConfiguration).Assembly);
            modelBuilder.Entity<Assignment>()
                .Property(t => t.Status)
                .HasConversion(new TaskStatusConvertor());
            modelBuilder.Entity<RoomUser>()
                .Property(t => t.Role)
                .HasConversion(new RoomRoleConverter());
        }
    }
}
