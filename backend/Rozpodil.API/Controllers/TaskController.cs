using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Rozpodil.API.Dtos.Requests.Task;
using Rozpodil.Application.Interfaces.Repositories;
using Rozpodil.Domain.Entities;

namespace Rozpodil.API.Controllers
{
    [Route("api/rooms/{roomId}/tasks")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public TaskController(
                IUnitOfWork unitOfWork
            )
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IList<Assignment>>> GetAssignments(
                [FromRoute] Guid roomId,
                [FromQuery] DateTime? from,
                [FromQuery] DateTime? to
            ) {

            var tasks = await _unitOfWork.AssignmentRepository
                .GetAssignmentsByRoomAsync(roomId, from, to);

            return Ok(tasks);
        }

        // TODO: налаштуватир created відповідно до його обов'язкових параметрів
        [HttpPost]
        public async Task<ActionResult> CreateAssignment(CreateTaskDto dto)
        {
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(dto.UserId);
            var room = await _unitOfWork.RoomRepository.GetRoomById(dto.RoomId);

            if (user == null && room == null)
            {
                return BadRequest();
            }

            var assignment = new Assignment
            {
                Title = dto.Title,
                Description = dto.Description,
                dueTime = dto.Deadline,
                createdAt = dto.CreatedAt,
                User = user,
                Room = room,
                Status = Domain.Enums.TaskStatuses.Pending
            };

            await _unitOfWork.AssignmentRepository.CreateAssignmentAsync(assignment);
            await _unitOfWork.SaveChangesAsync();

            return Created();
        }

        [HttpDelete("{assignmentId}")]
        public async Task<ActionResult> DeleteAssignment(Guid assignmentId)
        {
            var assignment = await _unitOfWork.AssignmentRepository.GetAssignmentByIdAsync(assignmentId);

            if (assignment == null)
                return NoContent();

            await _unitOfWork.AssignmentRepository.DeleteAssignment(assignment);
            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch("{assignmentId}")]
        public async Task<ActionResult> PatchAssignment(Guid assignmentId, [FromBody] JsonPatchDocument<Assignment> patchDoc)
        {
            if (patchDoc == null)
                return BadRequest();

            var assignment = await _unitOfWork.AssignmentRepository.GetAssignmentByIdAsync(assignmentId);

            if (assignment == null)
                return NotFound();

            patchDoc.ApplyTo(assignment);

            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }
    }
}
