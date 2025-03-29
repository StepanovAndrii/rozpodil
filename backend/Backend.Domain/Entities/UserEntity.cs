using Microsoft.AspNetCore.Identity;

namespace Backend.Logic.Entities
{
    public class UserEntity : IdentityUser<Guid>
    {
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiresAtUtc { get; set; }

        public static UserEntity Create(string email, string username)
        {
            return new UserEntity
            {
                Email = email,
                UserName = username
            };
        }

        public override string ToString()
        {
            return UserName!;
        }
    }
}
