using Rozpodil.Domain.Entities;

namespace Rozpodil.Application.Models
{
    public class RefreshTokenModel
    {
        public Guid UserId { get; set; }
        public required string Token { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}
