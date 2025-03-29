using Backend.Logic.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.Persistence
{
    public class DataContext : IdentityDbContext<UserEntity, IdentityRole<Guid>, Guid>
    {
        public DbSet<RoomEntity> Rooms { get; set; }
        public DbSet<TaskEntity> Tasks { get; set; }

        public DataContext (
                DbContextOptions<DataContext> options
            ): base(options) 
        { }

        public DbSet<T> DbSet<T>() where T : class
        {
            return Set<T>();
        }

        public IQueryable<T> Query<T>() where T : class
        {
            return Set<T>();
        }
    }
}
