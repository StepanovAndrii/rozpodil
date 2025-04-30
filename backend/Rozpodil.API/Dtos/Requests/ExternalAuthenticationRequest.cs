namespace Rozpodil.API.Dtos.Requests
{
    public class ExternalAuthenticationRequest
    {
        public required string Code { get; set; }
        public required string CodeVerifier { get; set; }
        public required string Provider { get; set; }
    }
}
