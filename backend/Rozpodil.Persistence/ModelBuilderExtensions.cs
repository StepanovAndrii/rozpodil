using Microsoft.EntityFrameworkCore;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Persistence
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Achievement>().HasData(
                new Achievement
                {
                    Id = Guid.NewGuid(),
                    Title = "",
                    Description = "",
                    Conditions = new Dictionary<string, string>
                    {
                        { "" }
                    }
                }
            );
        }
    }
}
