using Rozpodil.Application.Common.Interfaces;

namespace Rozpodil.Persistence
{
    public class TransactionManager : ITransactionManager
    {
        private readonly DatabaseContext _databaseContext;

        public TransactionManager(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task ExecuteInTransactionAsync(Func<Task> action)
        {
            using var transaction = await _databaseContext.Database.BeginTransactionAsync();

            try
            {
                await action();
                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}
