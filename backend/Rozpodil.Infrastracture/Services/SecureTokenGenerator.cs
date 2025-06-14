using Rozpodil.Application.Common.Interfaces;
using System.Security.Cryptography;

namespace Rozpodil.Infrastructure.Services
{
    public class SecureTokenGenerator : ITokenGenerator
    {
        public string Generate(int length)
        {
            var randomBytes = new byte[length];
            using var randomNumberGenerator = RandomNumberGenerator.Create();
            randomNumberGenerator.GetBytes(randomBytes);

            var base64 = Convert.ToBase64String(randomBytes)
                .Replace('+', '-')
                .Replace('/', '_')
                .Replace("=", "");

            return base64;
        }
    }
}
