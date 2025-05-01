namespace Rozpodil.Application.Interfaces.Auth
{
    public interface ICodeGeneratorService
    {
        string GenerateCode(int length = 6);
    }
}
