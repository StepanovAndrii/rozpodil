using Rozpodil.Application.Common.Enums;

namespace Rozpodil.Application.Common.Utilities
{
    public static class OAuthProviderUrls
    {
        private static readonly Dictionary<OAuthProvider, string> _providerUrls = new Dictionary<OAuthProvider, string>
        {
            { OAuthProvider.Google, "https://accounts.google.com" },
        };

        // TODO: створити власні exception
        public static string GetDiscoveryUrl(OAuthProvider oAuthProvider)
        {
            return _providerUrls.TryGetValue(oAuthProvider, out var baseUrl) ?
                $"{baseUrl}/.well-known/openid-configuration" :
                throw new Exception($"Discovery URL для провайдера {oAuthProvider} не знайдено");
        }
    }
}
