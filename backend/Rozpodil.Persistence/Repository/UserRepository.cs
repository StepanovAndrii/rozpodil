using Microsoft.EntityFrameworkCore;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Persistence.Repository
{
    public class UserRepository
    {
        private readonly DatabaseContext _context;

        public UserRepository(
            DatabaseContext context
            ) {
            _context = context;
        }

        public async Task<User?> GetUserById(Guid id)
        {
            return await _context.Users
                .Where(user => user.Id == id)
                .FirstOrDefaultAsync();
        }
    }
}
