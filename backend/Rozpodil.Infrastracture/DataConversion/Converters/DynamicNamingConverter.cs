using Rozpodil.Application.Common.Utilities;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace Rozpodil.Infrastructure.DataConversion.Converters
{
    public class DynamicNamingConverter<T> : JsonConverter<T>
    {
        private readonly JsonSerializerOptions _options;
        public DynamicNamingConverter(
                JsonSerializerOptions options
            )
        {
            _options = options;
        }

        // TODO: покращити для роботи з кладеними об'єктами
        public override T Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            using (JsonDocument document = JsonDocument.ParseValue(ref reader))
            {
                var root = document.RootElement;
                var dictionary = new Dictionary<string, JsonElement>();

                foreach (var property in root.EnumerateObject())
                {
                    var dynamicCaseProperty = ConvertPropertyName(property.Name);
                    dictionary[dynamicCaseProperty] = property.Value;
                }

                return ConvertToObject(dictionary);
            }
        }

        public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
        {
            writer.WriteStartObject();

            foreach (var property in typeof(T).GetProperties())
            {
                var name = CaseConverter.ConvertToSnakeCase(property.Name);
                var val = property.GetValue(value);

                writer.WritePropertyName(name);

                if (val == null)
                {
                    writer.WriteNullValue();
                }
                else if (val is int or long or float or double or decimal)
                {
                    writer.WriteNumberValue(Convert.ToDouble(val));
                }
                else if (val is bool boolean)
                {
                    writer.WriteBooleanValue(boolean);
                }
                else if (val is string stringValue)
                {
                    writer.WriteStringValue(stringValue);
                }
                else
                {
                    JsonSerializer.Serialize(writer, val, options);
                }
            }

            writer.WriteEndObject();
        }

        private string ConvertPropertyName(string propertyName)
        {
            JsonNamingPolicy namingPolicy = DetermineNamingPolicy(propertyName);

            if (namingPolicy == JsonNamingPolicy.SnakeCaseLower)
                return ConvertSnakeCaseToPascalCase(propertyName);
            
            return ConvertCamelCaseToPascalCase(propertyName);
        }

        private JsonNamingPolicy DetermineNamingPolicy(string propertyName)
        {
            if (IsSnakeCase(propertyName))
            {
                return JsonNamingPolicy.SnakeCaseLower;
            }
            else if (IsCamelCase(propertyName))
            {
                return JsonNamingPolicy.CamelCase;
            }
            throw new Exception("Політика для назви не підтримується");
        }

        private bool IsSnakeCase(string value)
        {
            return Regex.IsMatch(value, @"^[a-z]+(_[a-z]+)*$");
        }

        private bool IsCamelCase(string value)
        {
            return Regex.IsMatch(value, @"^[a-z]+([A-Z][a-z]*)*$");
        }

        private T ConvertToObject(Dictionary<string, JsonElement> dictionary)
        {
            var json = JsonSerializer.Serialize(dictionary);
            return JsonSerializer.Deserialize<T>(json)!;
        }
        // TODO: винести в CaseConverter
        private string ConvertSnakeCaseToPascalCase(string snakeCase)
        {
            return string.Join("",
                snakeCase
                    .Split('_', StringSplitOptions.RemoveEmptyEntries)
                    .Select(part => char.ToUpper(part[0]) + part.Substring(1)));
        }


        private string ConvertCamelCaseToPascalCase(string camelCase)
        {
           return char.ToUpper(camelCase[0]) + camelCase.Substring(1);
        }
    }
}
