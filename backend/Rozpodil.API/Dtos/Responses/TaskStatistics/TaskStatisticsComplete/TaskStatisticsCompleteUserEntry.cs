namespace Rozpodil.API.Dtos.Responses.TaskStatistics.TaskStatisticsComplete
{
    public class TaskStatisticsCompleteUserEntry
    {
        public Guid UserId { get; set; }
        public required string UserName { get; set; }
        public int CompletedTasks { get; set; }
    }
}
