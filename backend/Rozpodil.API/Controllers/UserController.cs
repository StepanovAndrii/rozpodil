using Microsoft.AspNetCore.Mvc;
using Rozpodil.Application.Interfaces.Repositories;
using Rozpodil.Domain.Entities;

namespace Rozpodil.API.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserController(
                IUnitOfWork unitOfWork
            )
        {
            _unitOfWork = unitOfWork;
        }

        // TODO: зробити по людськи
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserByToken(Guid id)
        {
            var tokenUserId = User.FindFirst("sub")?.Value;
            Console.WriteLine("Я тут увкп");
            if (tokenUserId == null)
            {
                return Unauthorized();
            }

            if (tokenUserId != id.ToString())
            {
                return Forbid();
            }

            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}
