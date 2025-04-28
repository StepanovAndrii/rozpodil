namespace Rozpodil.Application.Models.OAuth
{
    public class TokenRequestBody
    {
        public string GrantType { get; set; } = "authorization_code";
        public required string Code { get; set; }
        public required string RedirectUri { get; set; }
        public required string ClientId { get; set; }
        public string? ClientSecret { get; set; }
        public required string CodeVerifier { get; set; }
    }
}
