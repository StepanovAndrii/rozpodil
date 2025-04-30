using AutoMapper;
using Microsoft.Extensions.Options;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Common;
using Rozpodil.Application.Common.Enums;
using Rozpodil.Application.Common.Models;
using Rozpodil.Application.Common.Utilities;
using Rozpodil.Application.Interfaces;
using Rozpodil.Application.Models;
using Rozpodil.Application.Models.OAuth;
using Rozpodil.Domain.Entities;
using Rozpodil.Infrastructure.Options;

namespace Rozpodil.Infrastructure.Services
{
    public class OAuthService : IOAuthService
    {
        private readonly HttpClient _httpClient;
        private readonly IMapper _mapper;
        private readonly IDynamicJsonSerializer _dynamicJsonSerializer;
        private readonly ITokenValidationService _tokenValidationService;
        private readonly OAuthSettings _options;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IRefreshTokenService _refreshTokenService;
        private readonly ICookieService _cookieService;

        public OAuthService(
                HttpClient httpClient,
                IMapper mapper,
                IDynamicJsonSerializer dynamicJsonSerializer,
                ITokenValidationService tokenValidationService,
                IOptions<OAuthSettings> options,
                IUnitOfWork unitOfWork,
                IJwtTokenService jwtTokenService,
                IRefreshTokenService refreshTokenService,
                ICookieService cookieService
            )
        {
            _httpClient = httpClient;
            _mapper = mapper;
            _dynamicJsonSerializer = dynamicJsonSerializer;
            _tokenValidationService = tokenValidationService;
            _options = options.Value;
            _unitOfWork = unitOfWork;
            _jwtTokenService = jwtTokenService;
            _refreshTokenService = refreshTokenService;
            _cookieService = cookieService;
        }

        public async Task<Result<AccessTokenModel, ErrorType>> AuthenticateExternalUserAsync(ExternalAuthenticationCommand externalAuthenticationCommand)
        {
            var externalAuthenticationModel = _mapper.Map<ExternalAuthenticationModel>(externalAuthenticationCommand);

            OAuthProvider oauthProvider = GetOAuthProvider(externalAuthenticationModel.Provider);
            var discoveryDocumentUrl = OAuthProviderUrls.GetDiscoveryUrl(oauthProvider);
            var discoveryDocument = await FetchDiscoveryDocumentAsync(discoveryDocumentUrl);

            var clientId = EnsureNullOrWhiteSpace(_options.ClientId, nameof(_options.ClientId));
            var clientSecret = EnsureNullOrWhiteSpace(_options.ClientSecret, nameof(_options.ClientSecret));
            var redirectUri = EnsureNullOrWhiteSpace(_options.RedirectUri, nameof(_options.RedirectUri));

            var tokenRequestBody = CreateTokenRequestBody(
                clientId,
                clientSecret,
                redirectUri,
                externalAuthenticationModel.Code,
                externalAuthenticationModel.CodeVerifier);

            var tokenResponse = await FetchOAuthTokenDataAsync(
                discoveryDocument.TokenEndpoint,
                tokenRequestBody
            );

            var token = tokenResponse.IdToken;

            var claimsPrincipal = await _tokenValidationService.ValidateIdTokenAsync(
                token,
                discoveryDocument.JwksUri,
                discoveryDocument.Issuer,
                clientId
            );

            var existingUser = await _unitOfWork.UserCredentialsRepository.GetUserByEmailAsync(
                claimsPrincipal.FindFirst("email")?.Value!
            );

            var id = existingUser?.Id ?? GuidGenerator.Generate();

            if (existingUser == null)
            {
                UserModel userModel = new UserModel
                {
                    Id = id,
                    Username = claimsPrincipal.FindFirst("name")?.Value,
                    IsEmailConfirmed = bool.Parse(claimsPrincipal.FindFirst("email_verified")?.Value)
                };

                UserCredentialsModel userCredentialsModel = new UserCredentialsModel
                {
                    Email = claimsPrincipal.FindFirst("email")?.Value,
                    HashedPassword = null
                };

                var user = _mapper.Map<User>(userModel);
                var userCredentials = _mapper.Map<UserCredentials>(userCredentialsModel);

                user.Credentials = userCredentials;

                await _unitOfWork.UserRepository.CreateUserAsync(
                    user
                );
                
                await _unitOfWork.SaveChangesAsync();
            }  

            var accessTokenModel = _jwtTokenService.GenerateToken(id);
            var refreshToken = await _refreshTokenService.GenerateAsync(id, 7);

            _cookieService.SetRefreshToken(refreshToken, 7);

            return Result<AccessTokenModel, ErrorType>.Ok(
                new AccessTokenModel
                {
                    AccessToken = accessTokenModel
                });
        }

        private async Task<OAuthToken> FetchOAuthTokenDataAsync(
                string tokenEndpoint,
                TokenRequestBody tokenRequestBody
            )
        {
            var keyValues = ObjectToKeyValueConverter.ToKeyValuePairCollection(tokenRequestBody);
            var content = new FormUrlEncodedContent(
                keyValues
            );

            var response = await _httpClient.PostAsync(
                tokenEndpoint,
                content
            );

            if (!response.IsSuccessStatusCode)
                throw new Exception("Запит не вдалий. Статус: " + response.StatusCode);

            var responseContent = await response.Content.ReadAsStringAsync();

            return _dynamicJsonSerializer.Deserialize<OAuthToken>(responseContent);
        }

        private TokenRequestBody CreateTokenRequestBody(
            string clientId,
            string clientSecret,
            string redirectUri,
            string code,
            string codeVerifier)
        {
            return new TokenRequestBody
            {
                ClientId = clientId,
                ClientSecret = clientSecret,
                RedirectUri = redirectUri,
                Code = code,
                CodeVerifier = codeVerifier
            };
        }

        private static string EnsureNullOrWhiteSpace(string? value, string name)
        {
            return string.IsNullOrWhiteSpace(value) ?
                throw new InvalidOperationException($"Не вказано {name}")
                : value;
        }

        private async Task<BackendDiscoveryDocument> FetchDiscoveryDocumentAsync(string discoveryDocumentUrl)
        {
            var response = await _httpClient.GetAsync(discoveryDocumentUrl);

            if (!response.IsSuccessStatusCode)
                throw new Exception($"Помилка при отриманні документа: {response.StatusCode}");

            var content = await response.Content.ReadAsStringAsync();
            var discoveryDocument = _dynamicJsonSerializer.Deserialize<BackendDiscoveryDocument>(content);

            if (discoveryDocument == null)
            {
                throw new Exception("Не вдалося десеріалізувати вміст документа");
            }

            return discoveryDocument;
        }

        private OAuthProvider GetOAuthProvider(string provider)
        {
            if (!Enum.TryParse(
                provider,
                ignoreCase: true,
                out OAuthProvider parsedProvider))
            {
                throw new ArgumentOutOfRangeException($"Непідтримуваний OAuth провайдер: {provider}");
            }

            return parsedProvider;
        }
    }
}
