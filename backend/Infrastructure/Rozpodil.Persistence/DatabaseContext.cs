using Microsoft.EntityFrameworkCore;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Persistence
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Room> Rooms { get; set; }
        public DbSet<User> Users { get; set; }

        public DatabaseContext(
            DbContextOptions<DatabaseContext> options
        ) : base(options) { }
    }
}
