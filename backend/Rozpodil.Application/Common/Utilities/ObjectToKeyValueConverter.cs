using System.Text.RegularExpressions;

namespace Rozpodil.Application.Common.Utilities
{
    public static class ObjectToKeyValueConverter
    {
        public static IEnumerable<KeyValuePair<string, string>> ToKeyValuePairCollection(object obj)
        {
            if (obj == null)
                throw new ArgumentNullException(nameof(obj), "Об'єкт не може бути null");

            var properties = obj.GetType().GetProperties();

            foreach (var property in properties)
            {
                var value = property.GetValue(obj)?.ToString();
                if (value != null)
                {
                    yield return new KeyValuePair<string, string>
                        (CaseConverter.ConvertToSnakeCase(property.Name),
                        value);
                }
            }
        }
    }
}
