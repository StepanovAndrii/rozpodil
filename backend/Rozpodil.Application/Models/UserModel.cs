namespace Rozpodil.Application.Models
{
    public class UserModel
    {
        public required string Username { get; set; }
        public bool IsEmailConfirmed { get; set; }
    }
}
