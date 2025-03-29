using MediatR;

namespace Backend.API.Endpoints.Authentication
{
    public class RegisterUserCommand : IRequest<RegisterUserResponse>
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string PasswordRepetition { get; set; }
    }
}