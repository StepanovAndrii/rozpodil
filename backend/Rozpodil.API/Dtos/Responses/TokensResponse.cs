namespace Rozpodil.API.Dtos.Responses
{
    public record TokensResponse (
        string AccessToken,
        string RefreshToken
    );
}
