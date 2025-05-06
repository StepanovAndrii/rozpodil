using Microsoft.AspNetCore.Mvc;
using Rozpodil.Application.Interfaces.Repositories;
using System.Security.Claims;

namespace Rozpodil.API.Controllers
{
    [Route("api/users/{userId}/rooms")]
    [ApiController]
    public class UserRoomsController : ControllerBase
    {
        // TODO: зробити в сервісі
        private readonly IUnitOfWork _unitOfWork;
        public UserRoomsController(
                IUnitOfWork unitOfWork
            )
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<ActionResult> GetRooms(
            Guid userId
        )
        {
            var tokenUserId = User.FindFirst("sub")?.Value;

            if(tokenUserId != userId.ToString())
            {
                return Forbid();
            } 

            var rooms = await _unitOfWork.RoomUserRepository.GetRoomsByUserId(userId);
            return Ok(rooms);

        }
    }
}
