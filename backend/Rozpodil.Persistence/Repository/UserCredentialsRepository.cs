using Microsoft.EntityFrameworkCore;
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
    }
}
