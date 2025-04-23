using Rozpodil.Application.Common.Interfaces;
using Rozpodil.Application.Interfaces;
using Rozpodil.Application.Services;
using Rozpodil.Application.Services.Interfaces;
using Rozpodil.Domain.Repositories;
using Rozpodil.Infrastructure.Services;
using Rozpodil.Persistence;
using Rozpodil.Persistence.Repository;

namespace Rozpodil.API.Extensions
{
    public static class DependencyInjectionExtensions
    {
        public static IServiceCollection AddScopedServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserCredentialsRepository, UserCredentialsRepository>();
            services.AddScoped<ITwoFactorCodeRepository, TwoFactorCodeRepository>();
            services.AddScoped<IRoomRepository, RoomRepository>();
            services.AddScoped<ITransactionManager, TransactionManager>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IJwtTokenService, JwtTokenService>();
            services.AddScoped<ITokenGenerator, SecureTokenGenerator>();

            return services;
        }
    }
}
