namespace Rozpodil.API.Dtos.Requests
{
    public record ExternalAuthenticationRequest(
        string Code,
        string CodeVerifier,
        string Provider
    );
}
