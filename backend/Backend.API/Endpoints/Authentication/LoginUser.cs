using FastEndpoints;

namespace Backend.API.Endpoints.Authentication
{
    public class LoginUser : Endpoint<LoginUserCommand, LoginUserResponse>
    {
        public override void Configure()
        {
            Post("/api/account/login");
            AllowAnonymous();
        }

        public override Task HandleAsync(LoginUserCommand req, CancellationToken ct)
        {
            return base.HandleAsync(req, ct);
        }
    }
}
