using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Rozpodil.Application.Interfaces.Security;
using Rozpodil.Infrastructure.Configurations;
using Rozpodil.Infrastructure.Services.Hashers;

namespace Rozpodil.Infrastructure.DependencyInjectionExtention
{
    public static class ServiceCollectionExtentions
    {
        public static IServiceCollection AddHasherServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<HasherSettings>(configuration.GetSection("HasherSettings"));

            services.AddScoped<Sha256HasherService>();
            services.AddScoped<BcryptHasherService>();
            services.AddScoped<IHasherFactory, HasherFactory>();

            return services;
        }
    }
}
