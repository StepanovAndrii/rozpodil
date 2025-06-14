using Rozpodil.Application.Mappings.CommandsModels;
using System.Reflection;

namespace Rozpodil.API.Mappings
{
    public static class AutoMapperConfig
    {
        public static IServiceCollection AddMappingProfiles(this IServiceCollection services)
        {
            services.AddAutoMapper(configuration => { },
                Assembly.GetExecutingAssembly(),
                typeof(RegisterUserCommandProfile).Assembly
            );

            return services;
        }
    }
}
