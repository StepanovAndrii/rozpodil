using Rozpodil.API.Mappings.Profiles;
using Rozpodil.Application.Mappings.CommandsModels;
using Rozpodil.Application.Mappings.ModelsEntities;

namespace Rozpodil.API.Mappings
{
    public static class AutoMapperConfig
    {
        public static IServiceCollection AddMappingProfiles(this IServiceCollection services)
        {
            services.AddAutoMapper(configuration =>
            {
                configuration.AddProfile<UserDtoMappingProfile>();
                configuration.AddProfile<RegisterUserCommandProfile>();
                configuration.AddProfile<RefreshTokenModelMappingProfile>();
                configuration.AddProfile<UserModelMappingProfile>();
            });

            return services;
        }
    }
}
