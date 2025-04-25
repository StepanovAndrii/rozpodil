using Microsoft.EntityFrameworkCore;
using Rozpodil.Domain.Entities;
using Rozpodil.Domain.Repositories;

namespace Rozpodil.Persistence.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext _context;

        public UserRepository(
            DatabaseContext context
            ) {
            _context = context;
        }

        public async Task<User> CreateUserAsync(User user)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(eUser => eUser.Id == user.Id);
            if (existingUser == null)
            {
                await _context.Users.AddAsync(user);
                return user;
            }

            return existingUser;
        }

        public async Task<User?> GetUserByIdAsync(Guid id)
        {
            return await _context.Users
                .FindAsync(id);
        }

        public async Task MarkEmailAsVerifiedAsync(Guid id)
        {
            var user = await _context.Users
                .FindAsync(id);

            if (user != null)
            {
                user.IsEmailConfirmed = true;
            }
        }
    }
}
