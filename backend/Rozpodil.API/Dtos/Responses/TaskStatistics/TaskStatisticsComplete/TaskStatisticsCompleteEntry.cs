namespace Rozpodil.API.Dtos.Responses.TaskStatistics.TaskStatisticsComplete
{
    public class TaskStatisticsCompleteEntry
    {
        public DateTime Date { get; set; }
        public required List<TaskStatisticsCompleteUserEntry> Users { get; set; }
    }
}
