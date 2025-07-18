﻿using Rozpodil.Domain.Entities;
using Rozpodil.Domain.Enums;
using Rozpodil.Domain.ValueObjects.TaskStatisticsComplete;
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
        Task AssignUserToTask(Guid assignmentId, User user);
        Task<List<TaskStatisticsComplete>> GetTaskStatisticsCompleteAsync(
                Guid roomId,
                DateTime? startDate,
                DateTime? endDate,
                List<Guid>? excludedUserIds
            );
    }
}
