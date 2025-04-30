namespace Rozpodil.Application.Interfaces
{
    public interface IDynamicJsonSerializer
    {
        string Serialize<T>(T value);
        T Deserialize<T>(string json);
    }
}
