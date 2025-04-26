using Microsoft.EntityFrameworkCore;
using Rozpodil.Domain.Entities;
using Rozpodil.Domain.Repositories;

namespace Rozpodil.Persistence.Repository
{
    public class UserCredentialsRepository : IUserCredentialsRepository
    {
        private readonly DatabaseContext _context;

        public UserCredentialsRepository(
            DatabaseContext context
            )
        {
            _context = context;
        }

        public async Task<bool> ExistsByEmailAsync(string email)
        {
            return await _context.UsersCredentials.AnyAsync(
                user => user.Email == email
            );
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            var user = await _context.UsersCredentials
                .Include(userCredentials => userCredentials.User)
                    .ThenInclude(user => user.Credentials)
                .Where(userCredentials => userCredentials.Email == email)
                .Select(userCredentials => userCredentials.User)
                .FirstOrDefaultAsync();

            return user;
        }
    }
}
