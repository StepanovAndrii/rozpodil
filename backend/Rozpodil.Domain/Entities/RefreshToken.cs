namespace Rozpodil.Domain.Entities
{
    public class RefreshToken
    {
        public Guid Id { get; set; }
        public required User User { get; set; }
        public required string Token { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}
