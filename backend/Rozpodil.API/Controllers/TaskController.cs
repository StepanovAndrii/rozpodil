using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Rozpodil.Application.Interfaces.Repositories;
using Rozpodil.Domain.Entities;

namespace Rozpodil.API.Controllers
{
    [Route("api/tasks/rooms/{roomId}/tasks")]
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
                [FromQuery] DateTime? from,
                [FromQuery] DateTime? to
            ) {

            var tasks = await _unitOfWork.AssignmentRepository
                .GetAssignmentsAsync(from, to);

            return Ok(tasks);
        }

        // TODO: налаштуватир created відповідно до його обов'язкових параметрів
        [HttpPost]
        public async Task<ActionResult> CreateAssignment(Assignment assignment)
        {
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
