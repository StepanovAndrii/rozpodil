﻿using Microsoft.Extensions.DependencyInjection;
using Rozpodil.Application.Interfaces.Services;

namespace Rozpodil.Infrastructure.Services.HostedServices
{
    public class ExpiredCodeCleanupService : ScheduledBackgroundService
    {
        public ExpiredCodeCleanupService(IServiceScopeFactory scopeFactory)
            : base(scopeFactory, TimeSpan.FromMinutes(1))
        { }

        protected override async Task DoWorkAsync(IServiceProvider scopedServices, CancellationToken cancellationToken)
        {
            var cleanupService = scopedServices.GetRequiredService<IAccountCleanupService>();
            await cleanupService.CleanExpiredCodesAsync(cancellationToken);
        }
    }
}
