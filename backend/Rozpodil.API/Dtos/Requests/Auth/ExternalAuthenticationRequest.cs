namespace Rozpodil.API.Dtos.Requests.Auth
{
    public class ExternalAuthenticationRequest
    {
        public required string Code { get; set; }
        public required string CodeVerifier { get; set; }
        public required string Provider { get; set; }
    }
}
