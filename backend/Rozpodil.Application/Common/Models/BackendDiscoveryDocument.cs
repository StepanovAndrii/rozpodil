using System.Text.Json.Serialization;

namespace Rozpodil.Application.Common.Models
{
    public class BackendDiscoveryDocument
    {
        public required string TokenEndpoint { get; set; }
        public required string Issuer {  get; set; }
        public required string JwksUri { get; set; }
    }
}
