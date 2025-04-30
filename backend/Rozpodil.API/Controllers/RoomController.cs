using Microsoft.AspNetCore.Mvc;
using Rozpodil.API.Dtos.Requests.Auth;
using Rozpodil.API.Dtos.Requests.Room;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Common;
using Rozpodil.Application.Interfaces;
using Rozpodil.Application.Services;
using Rozpodil.Infrastructure.Services;

namespace Rozpodil.API.Controllers
{
    [Route("api/rooms")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;
        public RoomController (
                IRoomService roomService
            )
        {
            _roomService = roomService;
        }

        [HttpPost("create")]
        public async Task<ActionResult> Register([FromBody] CreateRoomRequest createRoomRequest)
        {
            var registerUserCommand = _mapper.Map<RegisterUserCommand>(createRoomRequest);
            Result<ErrorType> result = await _authService.RegisterUser(registerUserCommand);

            if (result.Success)
            {
                return Accepted();
            }

            return BadRequest();
        }

        [HttpPost("join")]
        public async Task<ActionResult> Register([FromBody] RegisterUserRequest registerUserRequest)
        {
            var registerUserCommand = _mapper.Map<RegisterUserCommand>(registerUserRequest);
            Result<ErrorType> result = await _authService.RegisterUser(registerUserCommand);

            if (result.Success)
            {
                return Accepted();
            }

            return BadRequest();
        }
    }
}
