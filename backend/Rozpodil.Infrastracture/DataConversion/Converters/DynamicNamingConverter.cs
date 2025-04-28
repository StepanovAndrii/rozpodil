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

                return ConvertToObject<T>(dictionary);
            }
        }

        public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
        {
            var dictionary = new Dictionary<string, object>();
            var properties = typeof(T).GetProperties();

            foreach (var property in properties)
            {
                var snakeCaseProperty = ConvertToSnakeCase(property.Name);
                dictionary[snakeCaseProperty] = property.GetValue(value)!;
            }

            JsonSerializer.Serialize(writer, dictionary, options);
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

        private T ConvertToObject<T>(Dictionary<string, JsonElement> dictionary)
        {
            var json = JsonSerializer.Serialize(dictionary);
            return JsonSerializer.Deserialize<T>(json)!;
        }

        private string ConvertToSnakeCase(string name)
        {
            return Regex.Replace(name, @"([a-z])([A-Z])", "$1_$2").ToLower();
        }

        private string ConvertSnakeCaseToPascalCase(string snakeCase)
        {
            string value = Regex.Replace(snakeCase, @"_([a-z])", match =>
                match.Groups[1].Value.ToUpper());

            return char.ToUpper(value[0]) + value.Substring(1);
        }

        private string ConvertCamelCaseToPascalCase(string camelCase)
        {
           return char.ToUpper(camelCase[0]) + camelCase.Substring(1);
        }
    }
}
