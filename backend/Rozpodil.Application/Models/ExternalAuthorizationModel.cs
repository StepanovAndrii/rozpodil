using Rozpodil.Application.Common.Enums;

namespace Rozpodil.Application.Models
{
    public class ExternalAuthenticationModel
    {
        public required string Provider { get; set; }
        public required string Code { get; set; }
        public required string CodeVerifier { get; set; }
    }
}
