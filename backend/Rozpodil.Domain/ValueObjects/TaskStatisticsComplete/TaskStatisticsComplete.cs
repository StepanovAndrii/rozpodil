namespace Rozpodil.Domain.ValueObjects.TaskStatisticsComplete
{
    public class TaskStatisticsComplete
    {
        public Guid RoomId { get; private set; }
        public List<TaskStatisticsCompleteEntry> Statistics { get; private set; } = new();

        public TaskStatisticsComplete(Guid roomId, List<TaskStatisticsCompleteEntry> statistics)
        {
            RoomId = roomId;
            Statistics = statistics;
        }
    }
}
