using Rozpodil.Application.Interfaces.Services;
using Rozpodil.Infrastructure.DataConversion.Deserialization;
using System.Text.Json;

namespace Rozpodil.Infrastructure.Services
{
    public class DynamicJsonSerializer : IDynamicJsonSerializer
    {
        private readonly JsonSerializerOptions _options;
        public DynamicJsonSerializer()
        {
            _options = new JsonSerializerOptions()
            {
                Converters = { new DynamicNamingConverterFactory() }
            };
        }
        public T Deserialize<T>(string json)
        {
            var result = JsonSerializer.Deserialize<T>(json, _options);
            if (result == null)
            {
                throw new InvalidOperationException("Помилка при десеріалізації");
            }
            return result;
        }

        public string Serialize<T>(T value)
        {
            return JsonSerializer.Serialize(value, _options);
        }
    }
}
