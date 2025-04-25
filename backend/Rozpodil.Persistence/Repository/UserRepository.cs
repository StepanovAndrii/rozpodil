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

        public async Task DeleteUserByIdAsync(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
            }
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

        public async Task<List<User>> GetUnverifiedUsersWithExpiredCodesAsync(CancellationToken cancellationToken)
        {
            return await _context.Users
                .Where(user => !user.IsEmailConfirmed &&
                    (!_context.TwoFactorCodes.Any(code => code.UserId == user.Id) ||
                    _context.TwoFactorCodes.Any(code => 
                        code.UserId == user.Id &&
                        code.ExpiresAt < DateTime.UtcNow)))
                .ToListAsync(cancellationToken);
        }
    }
}
