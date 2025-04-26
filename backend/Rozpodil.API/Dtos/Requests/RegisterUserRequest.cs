namespace Rozpodil.API.Dtos.Requests
{
    public record RegisterUserRequest (
        string Username,
        string Email,
        string Password
    );
}
