namespace Backend.API.Configurations
{
    public static class CorsConfig
    {
        // Extension method that registers individual CORS
        public static IServiceCollection AddCustomCors(this IServiceCollection services)
        {
            var servicesProvider = services.BuildServiceProvider();
            var configuration = servicesProvider.GetRequiredService<IConfiguration>();

            var allowedOrigins = configuration.GetSection("AllowedOrigins").Get<string[]>() ?? [];

            services.AddCors(options =>
            {
                options.AddPolicy("AllowLocalhost4200", policy =>
                    policy.WithOrigins(allowedOrigins)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                );
            });

            return services;
        }
    }
}
