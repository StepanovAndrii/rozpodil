namespace Rozpodil.Domain.Entities
{
    public class TwoFactorCode
    {
        public Guid UserId { get; set; }
        public required string HashedCode { get; set; }
        public DateTime ExpiresAt { get; set; }
        public required User User { get; set; }
    }
}
