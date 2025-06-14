namespace Rozpodil.Application.Interfaces.Services
{
    public interface IDynamicJsonSerializer
    {
        string Serialize<T>(T value);
        T Deserialize<T>(string json);
    }
}
