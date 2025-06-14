namespace Rozpodil.Application.Models
{
    public class UserModel
    {
        public Guid Id { get; set; }
        public required string Username { get; set; }
        public string? PhotoUrl { get; set; }
        public bool IsEmailConfirmed { get; set; }
    }
}
