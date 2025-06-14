namespace Rozpodil.Application.Commands
{
    public class ExternalAuthenticationCommand
    {
        public required string Provider {  get; set; }
        public required string Code { get; set; }
        public required string CodeVerifier { get; set; }
    }
}
