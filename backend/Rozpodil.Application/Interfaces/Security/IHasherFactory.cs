using Rozpodil.Application.Common.Enums;

namespace Rozpodil.Application.Interfaces.Security
{
    public interface IHasherFactory
    {
        IHasherService GetHasher(HasherType type);
    }
}
