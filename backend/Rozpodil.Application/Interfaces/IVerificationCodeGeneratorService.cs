namespace Rozpodil.Application.Interfaces
{
    public interface IVerificationCodeGeneratorService
    {
        string GenerateCode(int length = 6);
    }
}
