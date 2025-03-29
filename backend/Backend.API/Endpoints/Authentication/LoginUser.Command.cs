namespace Backend.API.Endpoints.Authentication
{
    public class LoginUserCommand
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}
