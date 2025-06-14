namespace Rozpodil.Application.Models
{
    public record UserCredentialsModel
    {
        public Guid UserId { get; set; }
        public required string Email { get; set; }
        public string? HashedPassword { get; set; }
    }
}
