namespace Rozpodil.Domain.Entities
{
    public class RefreshToken
    {
        public Guid UserId { get; set; }
        public required string HashedToken { get; set; }
        public DateTime ExpiresAt { get; set; }
        public required User User { get; set; }
    }
}
