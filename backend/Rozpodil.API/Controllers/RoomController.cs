using Microsoft.AspNetCore.Mvc;
using Rozpodil.Application.Services;
using Rozpodil.Domain.Entities;

namespace Rozpodil.API.Controllers
{
    [Route("api/rooms")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private RoomService _roomService;
        public RoomController(
            
            )
        {

        }
        public ActionResult<Room> GetRoomsByUserId(Guid userId)
        {

        }
    }
}
