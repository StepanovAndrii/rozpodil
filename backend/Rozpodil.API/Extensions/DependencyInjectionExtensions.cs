using Rozpodil.Application.Common.Interfaces;
using Rozpodil.Application.Interfaces;
using Rozpodil.Application.Interfaces.Auth;
using Rozpodil.Application.Interfaces.Auth.AuthContext;
using Rozpodil.Application.Interfaces.Repositories;
using Rozpodil.Application.Interfaces.Services;
using Rozpodil.Application.Services;
using Rozpodil.Application.Services.Validation;
using Rozpodil.Domain.Repositories;
using Rozpodil.Infrastructure.Services;
using Rozpodil.Infrastructure.Services.HostedServices;
using Rozpodil.Persistence;
using Rozpodil.Persistence.Repository;

namespace Rozpodil.API.Extensions
{
    public static class DependencyInjectionExtensions
    {
        // TODO: розбити на секції
        public static IServiceCollection AddScopedServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserCredentialsRepository, UserCredentialsRepository>();
            services.AddScoped<ITwoFactorCodeRepository, TwoFactorCodeRepository>();
            services.AddScoped<IRoomUserRepository, RoomUserRepository>();
            services.AddScoped<IAssignmentRepository, AssignmentRepository>();
            services.AddScoped<IRoomRepository, RoomRepository>();
            services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
            services.AddScoped<ITransactionManager, TransactionManager>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IJwtTokenService, JwtTokenService>();
            services.AddScoped<ICodeGeneratorService, CodeGeneratorService>();
            services.AddScoped<IRefreshTokenService, RefreshTokenService>();
            services.AddScoped<ITokenGenerator, SecureTokenGenerator>();
            services.AddScoped<IDateTimeProvider, DateTimeProvider>();
            services.AddScoped<ICookieService, CookieService>();
            services.AddScoped<IAccountCleanupService, AccountCleanupService>();
            services.AddScoped<IDynamicJsonSerializer, DynamicJsonSerializer>();
            services.AddScoped<ITokenManager, TokenManager>();
            services.AddScoped<IRoomService, RoomService>();
            services.AddScoped<IEmailValidationService, EmailValidationService>();
            services.AddScoped<IAchievementService, AchievementService>();

            return services;
        }

        public static IServiceCollection AddHostedServices(this IServiceCollection services)
        {
            services.AddHostedService<ExpiredCodeCleanupService>();
            services.AddHostedService<UnverifiedUserCleanupService>();

            return services;
        }

        public static IServiceCollection AddHttpClients(this IServiceCollection services)
        {
            services.AddHttpClient<IOAuthService, OAuthService>();
            services.AddHttpClient<ITokenValidationService, TokenValidationService>();

            return services;
        }
    }
}
