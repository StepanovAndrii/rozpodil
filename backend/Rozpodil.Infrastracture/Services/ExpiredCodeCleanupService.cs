using Microsoft.Extensions.DependencyInjection;
using Rozpodil.Application.Interfaces;

namespace Rozpodil.Infrastructure.Services
{
    public class ExpiredCodeCleanupService : ScheduledBackgroundService
    {
        public ExpiredCodeCleanupService(IServiceScopeFactory scopeFactory)
            : base(scopeFactory, TimeSpan.FromMinutes(5))
        { }

        protected override async Task DoWorkAsync(IServiceProvider scopedServices, CancellationToken cancellationToken)
        {
            var cleanupService = scopedServices.GetRequiredService<IAccountCleanupService>();
            await cleanupService.CleanExpiredCodesAsync(cancellationToken);
        }
    }
}
