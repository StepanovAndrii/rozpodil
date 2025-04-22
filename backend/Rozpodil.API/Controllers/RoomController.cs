using Microsoft.AspNetCore.Mvc;
using Rozpodil.API.Dtos.Requests;
using Rozpodil.Application.Services;

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

        [HttpPost("create")]
        public ActionResult CreateRoom([FromBody] CreateRoomRequest createRoomRequest)
        {
            _roomService.CreateRoom();
        }
    }
}
