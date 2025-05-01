using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rozpodil.API.Dtos.Requests.Auth;
using Rozpodil.API.Dtos.Requests.Room;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Common;
using Rozpodil.Application.Interfaces.Services;
using System.Security.Claims;

namespace Rozpodil.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/room")]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;
        private readonly IMapper _mapper;
        public RoomController (
                IRoomService roomService,
                IMapper mapper
            )
        {
            _mapper = mapper;
            _roomService = roomService;
        }

        [HttpPost("create")]
        public async Task<ActionResult> Register([FromBody] CreateRoomRequest createRoomRequest)
        {
            var userId = User.FindFirst("nameid")?.Value;


            if (userId == null)
            {
                return Created();
            }

            var guidUserId = Guid.Parse(userId);

            var registerUserCommand = _mapper.Map<CreateRoomCommand>(createRoomRequest);
            var result = await _roomService.CreateRoomAsync(registerUserCommand, guidUserId);

            if (result.Success)
            {
                return Accepted();
            }

            return BadRequest();
        }

        [HttpPost("join")]
        public async Task<ActionResult> Register([FromBody] RegisterUserRequest registerUserRequest)
        {
            return Ok();
        }
    }
}
