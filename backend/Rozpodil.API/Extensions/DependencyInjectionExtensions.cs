using Rozpodil.Application.Common.Interfaces;
using Rozpodil.Application.Interfaces;
using Rozpodil.Application.Interfaces.Repositories;
using Rozpodil.Application.Services;
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
            services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
            services.AddScoped<ITransactionManager, TransactionManager>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IJwtTokenService, JwtTokenService>();
            services.AddScoped<IVerificationCodeGeneratorService, VerificationCodeGeneratorService>();
            services.AddScoped<IRefreshTokenService, RefreshTokenService>();
            services.AddScoped<ITokenGenerator, SecureTokenGenerator>();
            services.AddScoped<IDateTimeProvider, DateTimeProvider>();

            return services;
        }
    }
}
