using Backend.Logic.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Persistence.Repositories
{
    public class UserRepository(DataContext applicationDbContext) : IUserRepository
    {
        public async Task<UserEntity?> GetUserByRefreshTokenAsync(string refreshToken)
        {
            var user = await applicationDbContext.Users.FirstOrDefaultAsync(user => user.RefreshToken == refreshToken);

            return user;
        }
    }
}
