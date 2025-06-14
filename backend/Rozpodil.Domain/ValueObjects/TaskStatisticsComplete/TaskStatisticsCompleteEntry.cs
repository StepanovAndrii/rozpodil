namespace Rozpodil.Domain.ValueObjects.TaskStatisticsComplete
{
    public class TaskStatisticsCompleteEntry
    {
        public DateTime Date { get; private set; }
        public List<TaskStatisticsCompleteUserEntry> Users { get; private set; } = new();

        public TaskStatisticsCompleteEntry(DateTime date, List<TaskStatisticsCompleteUserEntry> users)
        {
            Date = date;
            Users = users;
        }
    }
}
