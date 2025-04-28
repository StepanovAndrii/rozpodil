using AutoMapper;
using Microsoft.Extensions.Configuration;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Common;
using Rozpodil.Application.Common.Enums;
using Rozpodil.Application.Common.Models;
using Rozpodil.Application.Common.Utilities;
using Rozpodil.Application.Interfaces;
using Rozpodil.Application.Models;

namespace Rozpodil.Infrastructure.Services
{
    public class OAuthService : IOAuthService
    {
        private readonly HttpClient _httpClient;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public OAuthService(
                HttpClient httpClient,
                IMapper mapper,
                IConfiguration configuration
            )
        {
            _httpClient = httpClient;
            _mapper = mapper;
            _configuration = configuration;
        }

        public Task<Result<AccessTokenModel, ErrorType>> AuthenticateExternalUserAsync(ExternalAuthenticationCommand externalAuthenticationCommand)
        {
            var externalAuthenticationModel = _mapper.Map<ExternalAuthenticationModel>(externalAuthenticationCommand);

            OAuthProvider oauthProvider = GetOAuthProvider(externalAuthenticationModel.Provider);
            var discoveryDocumentUrl = OAuthProviderUrls.GetDiscoveryUrl(oauthProvider);
            // отримати discovery документ
            // отримати клієнт айді
            // отримати клієнт секрет
            // ...
            // скласти тіло запиту
            // відправити запит на обмін токена
            // перевірити токен на подліність
            // отримати дані з токену
            // перевірити користувача в бд
            // згенерувати access токен
            // згенерувати refresh токен
            // повернути access та refresh
        }

        private BackendDiscoveryDocument FetchDiscoveryDocument()
        {

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

        private async BackendDiscoveryDocument FetchDiscoveryDocumentAsync(string discoveryDocumentUrl)
        {
            await _httpClient.PostAsync();
        }
    }
}
