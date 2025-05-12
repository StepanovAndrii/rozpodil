namespace Rozpodil.API.Dtos.Responses.TaskStatistics.TaskStatisticsComplete
{
    public class TaskStatisticsCompleteDto
    {
        public Guid RoomId { get; set; }
        public required List<TaskStatisticsCompleteEntry> Statistics { get; set; }
    }
}
