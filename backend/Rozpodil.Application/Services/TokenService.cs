using Rozpodil.Application.Common;
using Rozpodil.Application.Models;
using System.Security.Cryptography;
using System.Text;

namespace Rozpodil.Application.Services
{
    // TODO: оптимізувати код об'єднавши з SecureCodeGenerator утилітою
    public class TokenService
    {
        private readonly RandomNumberGenerator _rng = RandomNumberGenerator.Create();

        // TODO: додай логіку додавання часу через параметри і обирання дні чи місяці
        public Result<RefreshTokenModel, ErrorType> GenerateRefreshToken(int length = 64, string allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
        {
            if (string.IsNullOrEmpty(allowedChars))
                throw new ArgumentException("Allowed characters cannot be empty.", nameof(allowedChars));

            byte[] randomBytes = new byte[length];
            _rng.GetBytes(randomBytes);

            StringBuilder stringBuilder = new();

            foreach (var byteValue in randomBytes)
            {
                stringBuilder.Append(allowedChars[byteValue % allowedChars.Length]);
            }

            var refreshTokenModel = new RefreshTokenModel
            {
                Token = stringBuilder.ToString(),
                ExpiresAt = DateTime.UtcNow.AddDays(7),
            };

            return Result<RefreshTokenModel, ErrorType>.Ok(refreshTokenModel);
        }
    }
}
