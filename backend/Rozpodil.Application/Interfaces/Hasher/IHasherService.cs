namespace Rozpodil.Application.Interfaces.IHasher
{
    public interface IHasherService
    {
        string Hash(string input);
        bool Verify(string input, string hashed);
    }
}
