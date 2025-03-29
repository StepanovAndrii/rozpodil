using Backend.Application.Abstracts;
using Backend.Application.Abstracts.ExternalAbstracts.EmailVerification;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Application.Services
{
    public class AuthenticationService(
            UserManager<IdentityUser> userManager,
            IEmailVerificationService emailVerificationService
        ): IAuthenticationService
    {
        // Registration with form
        public async Task<string?> RegisterWithEmailAsync(string email, string password)
        {
            Dictionary<string, string> errorMessages = new()
            {
                {"DuplicateUserName", "An account with this email already exists"},
                {"PasswordTooShort", "The password is too short"},
                {"InvalidEmail", "The email address is not in a valid format"}
            };

            IdentityUser newUser = new()
            {
                Email = email,
                UserName = email
            };

            IdentityResult createResult = await userManager.CreateAsync(newUser, password);

            if(!createResult.Succeeded)
            {
                return createResult.Errors
                    .Select(e => errorMessages.GetValueOrDefault(e.Code, e.Description))
                    .FirstOrDefault();
            }

            string confirmationToken = await userManager.GenerateEmailConfirmationTokenAsync(newUser);
            string confirmationTokenInBase64Format = Base64UrlEncoder.Encode(confirmationToken);

            await emailVerificationService.SendVerificationLinkAsync(newUser.Id, email, confirmationTokenInBase64Format);

            return null;
        }

        // Login with google

        public async void TryGetToken(string code, string codeVerifier)
        {
            using (var client = new HttpClient())
            {
                var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("code", code),
                    new KeyValuePair<string, string>("client_id", "936348575223-3tfersreot1291v3o4acu2j3klvag4ho.apps.googleusercontent.com"),
                    new KeyValuePair<string, string>("client_secret", "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"),
                    new KeyValuePair<string, string>("redirect_uri", "http://localhost:4200/auth/callback"),
                    new KeyValuePair<string, string>("grant_type", "authorization_code"),
                    new KeyValuePair<string, string>("code_verifier", codeVerifier)
                });

                Console.WriteLine("codeVerifier: " + codeVerifier);

                content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/x-www-form-urlencoded");
                Console.WriteLine("codeVerifier: " + codeVerifier);
                var response = await client.PostAsync("https://oauth2.googleapis.com/token", content);
                Console.WriteLine("codeVerifier: " + codeVerifier);
                string responseString = await response.Content.ReadAsStringAsync();
                Console.WriteLine(responseString);
            }
        }
    }
}
