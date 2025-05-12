using Microsoft.EntityFrameworkCore;
using Rozpodil.Application.Interfaces.Repositories;
using Rozpodil.Domain.Entities;
using Rozpodil.Domain.Enums;
using Rozpodil.Domain.ValueObjects.TaskStatisticsComplete;
using System.Threading.Tasks;

namespace Rozpodil.Persistence.Repository
{
    public class AssignmentRepository: IAssignmentRepository
    {
        private readonly DatabaseContext _context;

        public AssignmentRepository(
                DatabaseContext context
            )
        {
            _context = context;
        }

        public async Task<Assignment> CreateAssignmentAsync( Assignment assignment )
        {
            await _context.AddAsync( assignment );
            return assignment;
        }

        public Task DeleteAssignment (Assignment assignment)
        {
            _context.Remove(assignment);
            return Task.CompletedTask;
        }

        public async Task<IList<Assignment>> GetAssignmentsByRoomAsync(Guid roomId, DateTime? startDate, DateTime? endDate)
        {
            var query = _context.Assignments
                .Where(assignment => assignment.RoomId == roomId).AsQueryable();

            if (startDate.HasValue)
                query = query.Where(assignment => assignment.dueTime >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(assignment => assignment.dueTime <= endDate.Value);

            return await query.ToListAsync();
        }

        public async Task<bool> UpdateAssignmentStatusAsync (Guid asignmentId, TaskStatuses newStatus)
        {
            var assignment = await _context.Assignments.FindAsync(asignmentId);

            if (assignment == null) return false;

            assignment.Status = newStatus;
            return true;
        }

        public async Task<Assignment?> GetAssignmentByIdAsync (Guid asignmentId)
        {
            return await _context.Assignments
                .FindAsync(asignmentId);
        }


        // TODO: покращити, розібрати
        public async Task<List<TaskStatisticsComplete>> GetTaskStatisticsCompleteAsync(
                Guid roomId,
                DateTime? startDate,
                DateTime? endDate,
                List<Guid>? excludedUserIds
            )
        {
            var query = _context.Assignments
                .Where(assignment => assignment.RoomId == roomId)
                .Where(assignment => assignment.Status == TaskStatuses.Completed);

            if (startDate.HasValue)
            {
                query = query.Where(assignment => assignment.completedAt >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(assignment => assignment.completedAt <= endDate.Value);
            }

            if (excludedUserIds != null && excludedUserIds.Any())
            {
                query = query.Where(assignment => assignment.UserId != null
                    && !excludedUserIds.Contains(assignment.UserId.Value));
            }

            var assignments = await query.ToListAsync();

            var groupedByDate = assignments
                .GroupBy(assignment => assignment.completedAt.Value.Date)
                .ToList();

            var statistics = new List<TaskStatisticsComplete>();

            foreach (var dateGroup in groupedByDate)
            {
                var usersForDate = dateGroup
                    .GroupBy(assignment => assignment.UserId)
                    .Select(userGroup => new TaskStatisticsCompleteUserEntry(
                        userGroup.Key.Value,
                        userGroup.First().User.Username,
                        userGroup.Count()
                    ))
                    .ToList();

                var statisticsEntry = new TaskStatisticsCompleteEntry(
                    dateGroup.Key,
                    usersForDate
                );

                statistics.Add(new TaskStatisticsComplete(
                    roomId,
                    new List<TaskStatisticsCompleteEntry> { statisticsEntry }
                ));
            }

            return statistics;
        }
    }
}
