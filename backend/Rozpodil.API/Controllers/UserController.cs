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
        [HttpGet("me")]
        public async Task<ActionResult<User>> GetUserByToken()
        {
            var userId = User.FindFirst("sub")?.Value;

            if (userId == null)
            {
                return Unauthorized();
            }

            var guidUserId = Guid.Parse(userId);

            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(guidUserId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}
