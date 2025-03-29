using Backend.Logic.Entities;

namespace Backend.Persistence.Repositories
{
    public interface IUserRepository
    {
        Task<UserEntity?> GetUserByRefreshTokenAsync(string refreshToken);
    }
}
