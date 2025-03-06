using System.Text.Json.Serialization;

namespace Backend.API.Contracts
{
    public record AccessAndVerifierCodeDto
    {
        [JsonPropertyName("code")]
        public string code { get; init; } = string.Empty;
        [JsonPropertyName("code_verifier")]
        public string codeVerifier { get; init; } = string.Empty;
    }
}
