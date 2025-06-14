namespace Rozpodil.Application.Common.Interfaces
{
    public interface ITokenGenerator
    {
        string Generate(int length = 64);
    }
}
