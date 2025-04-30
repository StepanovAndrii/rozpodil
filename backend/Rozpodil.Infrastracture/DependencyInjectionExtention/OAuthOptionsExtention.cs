using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Rozpodil.Infrastructure.Options;

namespace Rozpodil.Infrastructure.DependencyInjectionExtention
{
    public static class OAuthOptionsExtention
    {
        public static IServiceCollection AddOAuthOptions(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<OAuthSettings>(
               configuration.GetSection("OAuth"));

            return services;
        }
    }
}
