using Microsoft.EntityFrameworkCore;
using Rozpodil.Application.Interfaces.Repositories;
using Rozpodil.Domain.Entities;
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

        public async Task<IList<Assignment>> GetAssignmentsAsync (DateTime? startDate, DateTime? endDate)
        {
            var query = _context.Assignments.AsQueryable();

            if (startDate.HasValue)
                query = query.Where(assignment => assignment.dueTime >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(assignment => assignment.dueTime <= endDate.Value);

            return await query.ToListAsync();
        }

        public async Task<bool> UpdateAssignmentStatusAsync (Guid asignmentId, TaskStatus newStatus)
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
    }
}
