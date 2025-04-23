using Rozpodil.Application.Common.Enums;

namespace Rozpodil.Application.Interfaces.IHasher
{
    public interface IHasherFactory
    {
        IHasherService GetHasher(HasherType type);
    }
}
