namespace Rozpodil.Application.Models
{
    public class RefreshTokenModel
    {
        public Guid UserId { get; set; }
        public required string HashedToken { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}
