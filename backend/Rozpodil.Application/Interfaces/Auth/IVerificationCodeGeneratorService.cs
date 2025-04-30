namespace Rozpodil.Application.Interfaces.Auth
{
    public interface IVerificationCodeGeneratorService
    {
        string GenerateCode(int length = 6);
    }
}
