namespace Rozpodil.Application.Interfaces.Security
{
    public interface IHasherService
    {
        string Hash(string input);
        bool Verify(string input, string hashed);
    }
}
