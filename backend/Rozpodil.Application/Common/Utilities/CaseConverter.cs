using System.Text.RegularExpressions;

namespace Rozpodil.Application.Common.Utilities
{
    public static class CaseConverter
    {
        public static string ConvertToSnakeCase(string propertyName)
        {
            return Regex.Replace(
                Regex.Replace(
                    propertyName,
                    @"([a-z])([A-Z])", "$1_$2"
                ),
                @"([A-Z])([A-Z][a-z])",
                "$1_$2"
            ).ToLower();
        }
    }
}
