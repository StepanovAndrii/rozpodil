using Newtonsoft.Json;

namespace Backend.Application
{
    class AuthService
    {
        private HttpClient _httpClient;

        public AuthService(HttpClient httpClient) {
            this._httpClient = httpClient;
        }

        public async void TryGetToken(string code, string codeVerifier)
        {
            var parameters = new Dictionary<string, string>
            {
                { "grant_type", "authorization_code" },
                { "code", code },
                { "redirect_uri", "https://yourapp.com/callback" },
                { "client_id", Environment.GetEnvironmentVariable("CLIENT_ID")! },
                { "client_secret", Environment.GetEnvironmentVariable("CLIENT_SECRET")! },
                { "code_verifier", codeVerifier }
            };
            var content = new FormUrlEncodedContent(parameters);
            var response = await this._httpClient.PostAsync("", content);
            var responseBody = await response.Content.ReadAsStringAsync();
            if (response.IsSuccessStatusCode)
            {
                var tokenResponse = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseBody);

                string accessToken = tokenResponse!["access_token"];
                string refreshToken = tokenResponse["refresh_token"];
            }
            else
            {
                
            }
        }
    }
}
