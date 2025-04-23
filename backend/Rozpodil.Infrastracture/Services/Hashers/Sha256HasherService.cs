using Rozpodil.Application.Interfaces.IHasher;
using System.Security.Cryptography;
using System.Text;

namespace Rozpodil.Infrastructure.Services.Hashers
{
    public class Sha256HasherService : IHasherService
    {
        public string Hash(string input)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(input);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }

        public bool Verify(string input, string hashed)
        {
            var hash = Hash(input);
            return hash == hashed;
        }
    }
}
