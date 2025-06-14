using Microsoft.EntityFrameworkCore;
using Rozpodil.Application.Interfaces.Repositories;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Persistence.Repository
{
    public class AchievementRepository : IAchievementRepository
    {
        private readonly DatabaseContext _context;

        public AchievementRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<Achievement?> GetByIdAsync(Guid id)
        {
            return await _context.Achievements
                .Include(a => a.UserAchievements)
                .FirstOrDefaultAsync(a => a.Id == id);
        }
    }
}
