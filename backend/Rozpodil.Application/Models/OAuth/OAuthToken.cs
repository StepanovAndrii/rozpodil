namespace Rozpodil.Application.Models.OAuth
{
    public class OAuthToken
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public bool EmailVerified { get; set; }
    }
}
