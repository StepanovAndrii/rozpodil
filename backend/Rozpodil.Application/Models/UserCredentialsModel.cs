namespace Rozpodil.Application.Models
{
    public record UserCredentialsModel
    {
        public required string Email { get; set; }
        public required string HashedPassword { get; set; }
    }
}
