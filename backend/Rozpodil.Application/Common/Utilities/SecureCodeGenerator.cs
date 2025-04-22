using System.Security.Cryptography;
using System.Text;

namespace Rozpodil.Application.Common.Utilities
{
    public static class SecureCodeGenerator
    {
        private static readonly RandomNumberGenerator _rng = RandomNumberGenerator.Create();

        public static string GenerateSecureCode(int length = 64)
        {
            byte[] randomBytes = new byte[length];
            _rng.GetBytes(randomBytes);

            StringBuilder stringBuilder = new();

            for (int iteration = 0; iteration < length; iteration++)
            {
                int digit = randomBytes[iteration] % 10;
                stringBuilder.Append(digit);
            }

            return stringBuilder.ToString();
        }
    } 
}
