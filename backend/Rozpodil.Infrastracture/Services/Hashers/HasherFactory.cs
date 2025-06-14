using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Rozpodil.Application.Common.Enums;
using Rozpodil.Application.Interfaces.Security;
using Rozpodil.Infrastructure.Configurations;

namespace Rozpodil.Infrastructure.Services.Hashers
{
    public class HasherFactory : IHasherFactory
    {
        private readonly IServiceProvider _provider;
        private readonly Dictionary<string, HasherType> _map;

        public HasherFactory(IServiceProvider provider, IOptions<HasherSettings> options)
        {
            _provider = provider;
            _map = options.Value.ServiceHasherMap;
        }

        public IHasherService GetHasher(HasherType type)
        {
            return type switch
            {
                HasherType.Bcrypt => _provider.GetRequiredService<BcryptHasherService>(),
                HasherType.Sha256 => _provider.GetRequiredService<Sha256HasherService>(),
                _ => throw new InvalidOperationException()
            };
        }
    }
}
