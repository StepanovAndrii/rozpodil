namespace Rozpodil.Domain.ValueObjects.TaskStatisticsComplete
{
    public class TaskStatisticsCompleteUserEntry
    {
        public Guid UserId { get; private set; }
        public string UserName { get; private set; }
        public int CompletedTasks { get; private set; }


        public TaskStatisticsCompleteUserEntry(Guid userId, string userName, int completedTasks)
        {
            UserId = userId;
            UserName = userName;
            CompletedTasks = completedTasks;
        }
    }
}
