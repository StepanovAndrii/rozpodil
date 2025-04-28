using Rozpodil.Infrastructure.DataConversion.Converters;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Rozpodil.Infrastructure.DataConversion.Deserialization
{
    public class DynamicNamingConverterFactory: JsonConverterFactory
    {
        public override bool CanConvert(Type typeToConvert)
        {
            return true;
        }

        public override JsonConverter? CreateConverter(Type typeToConvert, JsonSerializerOptions options)
        {
            var converterType = typeof(DynamicNamingConverter<>).MakeGenericType(typeToConvert);
            
            if (converterType == null)
            {
                throw new ArgumentNullException($"Не вдалось отримати {nameof(converterType)}");
            }

            var converter = Activator.CreateInstance(converterType, options) as JsonConverter;

            if (converter == null)
            {
                throw new InvalidOperationException($"Не вдалося створити екземпляр конвертера для типу {typeToConvert.FullName}");
            }

            return converter;
        }
    }
}
