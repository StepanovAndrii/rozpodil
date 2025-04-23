using Rozpodil.Application.Common.Interfaces;

namespace Rozpodil.Infrastructure.Services
{
    public class DateTimeProvider : IDateTimeProvider
    {
        public DateTime UtcNow => DateTime.UtcNow;
    }
}
