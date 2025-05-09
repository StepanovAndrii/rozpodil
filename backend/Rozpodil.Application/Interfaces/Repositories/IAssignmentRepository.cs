using Rozpodil.Domain.Entities;
using Rozpodil.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rozpodil.Application.Interfaces.Repositories
{
    public interface IAssignmentRepository
    {
        Task<Assignment> CreateAssignmentAsync(Assignment assignment);
        Task DeleteAssignment(Assignment assignment);
        Task<IList<Assignment>> GetAssignmentsByRoomAsync(Guid roomId, DateTime? startDate, DateTime? endDate);
        Task<bool> UpdateAssignmentStatusAsync(Guid asignmentId, TaskStatuses newStatus);
        Task<Assignment?> GetAssignmentByIdAsync(Guid asignmentId);
    }
}
