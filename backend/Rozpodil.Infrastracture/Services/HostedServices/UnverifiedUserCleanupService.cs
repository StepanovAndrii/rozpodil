
using Microsoft.Extensions.DependencyInjection;
using Rozpodil.Application.Interfaces.Services;

namespace Rozpodil.Infrastructure.Services.HostedServices
{
    public class UnverifiedUserCleanupService : ScheduledBackgroundService
    {
        public UnverifiedUserCleanupService(IServiceScopeFactory scopeFactory)
            : base(scopeFactory, TimeSpan.FromDays(1))
        { }

        protected override async Task DoWorkAsync(IServiceProvider scopedServices, CancellationToken cancellationToken)
        {
            var cleanupService = scopedServices.GetRequiredService<IAccountCleanupService>();
            await cleanupService.DeleteUnverifiedUsersWithExpiredCodesAsync(cancellationToken);
        }
    }
}
