using Rozpodil.API.Mappings.Profiles;

namespace Rozpodil.API.Mappings
{
    public static class AutoMapperConfig
    {
        public static IServiceCollection AddMappingProfiles(this IServiceCollection services)
        {
            services.AddAutoMapper(configuration =>
            {
                configuration.AddProfile<UserDtoMappingProfile>();
                configuration.AddProfile<Application.Mappings.UserModelMappingProfile>();
            });

            return services;
        }
    }
}
