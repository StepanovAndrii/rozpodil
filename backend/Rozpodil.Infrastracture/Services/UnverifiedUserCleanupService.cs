
using Microsoft.Extensions.DependencyInjection;
using Rozpodil.Application.Interfaces;

namespace Rozpodil.Infrastructure.Services
{
    public class UnverifiedUserCleanupService : ScheduledBackgroundService
    {
        public UnverifiedUserCleanupService(IServiceScopeFactory scopeFactory)
            : base(scopeFactory, TimeSpan.FromMinutes(5))
        { }

        protected override async Task DoWorkAsync(IServiceProvider scopedServices, CancellationToken cancellationToken)
        {
            var cleanupService = scopedServices.GetRequiredService<IAccountCleanupService>();
            await cleanupService.DeleteUnverifiedUsersWithExpiredCodesAsync(cancellationToken);
        }
    }
}
