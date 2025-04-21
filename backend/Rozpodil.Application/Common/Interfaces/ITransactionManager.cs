namespace Rozpodil.Application.Common.Interfaces
{
    public interface ITransactionManager
    {
        Task ExecuteInTransactionAsync(Func<Task> action);
    }
}
