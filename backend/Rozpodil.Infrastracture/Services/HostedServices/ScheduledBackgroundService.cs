using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Rozpodil.Infrastructure.Services.HostedServices
{
    public abstract class ScheduledBackgroundService : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly TimeSpan _interval;
        protected ScheduledBackgroundService(IServiceScopeFactory scopeFactory, TimeSpan interval)
        {
            _scopeFactory = scopeFactory;
            _interval = interval;
        }
        protected abstract Task DoWorkAsync(IServiceProvider scopedServices, CancellationToken cancellationToken);
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using var scope = _scopeFactory.CreateScope();

                await DoWorkAsync(scope.ServiceProvider, stoppingToken);

                await Task.Delay(_interval, stoppingToken);
            }
        }
    }
}
