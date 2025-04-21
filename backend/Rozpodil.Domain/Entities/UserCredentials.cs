namespace Rozpodil.Domain.Entities
{
    public class UserCredentials
    {
        public Guid UserId { get; set; }
        public required string Email { get; set; }
        public required string HashedPassword { get; set; }
        public required User User { get; set; }
    }
}
