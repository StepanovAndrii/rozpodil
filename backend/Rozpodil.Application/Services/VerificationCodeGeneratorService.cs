using Rozpodil.Application.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace Rozpodil.Application.Services
{
    public class VerificationCodeGeneratorService: IVerificationCodeGeneratorService
    {
        private readonly RandomNumberGenerator _rng = RandomNumberGenerator.Create();

        public string GenerateCode(int length)
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
