using Rozpodil.Application.Interfaces.Security;

namespace Rozpodil.Infrastructure.Services.Hashers
{
    public class BcryptHasherService : IHasherService
    {
        public string Hash(string input)
        {
            return BCrypt.Net.BCrypt.HashPassword(input);
        }

        public bool Verify(string input, string hashed)
        {
            return BCrypt.Net.BCrypt.Verify(input, hashed);
        }
    }
}
