using Microsoft.AspNetCore.Mvc;
using Rozpodil.Application.Interfaces.Repositories;

namespace Rozpodil.API.Controllers
{
    [Route("api/rooms/{roomId}/users")]
    [ApiController]
    public class RoomUsersController : ControllerBase
    {
        private IUnitOfWork _unitOfWork;

        public RoomUsersController(
                IUnitOfWork unitOfWork
            ) => _unitOfWork = unitOfWork;

        [HttpGet]
        public async Task<ActionResult> GetUsers(
           Guid roomId
        )
        {
            var users = await _unitOfWork.RoomUserRepository.GetUsersByRoomId(roomId);

            return Ok(users);
        }
    }
}
