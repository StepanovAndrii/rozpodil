using Hangfire;
using Hangfire.PostgreSql;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Rozpodil.Infrastructure.DependencyInjectionExtention
{
    public static class HangfireExtention
    {
        public static IServiceCollection AddHangfire(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHangfire(config =>
                config.UsePostgreSqlStorage(options =>
                    options.UseNpgsqlConnection(configuration.GetConnectionString("PostgreConnection"))
                )
            );
            services.AddHangfireServer();

            return services;
        }
    }
}
