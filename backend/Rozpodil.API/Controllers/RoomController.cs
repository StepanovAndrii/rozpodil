using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rozpodil.API.Dtos.Requests.Auth;
using Rozpodil.API.Dtos.Requests.Room;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Common;
using Rozpodil.Application.Interfaces.Repositories;
using Rozpodil.Application.Interfaces.Services;
using System.Security.Claims;

namespace Rozpodil.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/rooms")]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public RoomController (
                IRoomService roomService,
                IMapper mapper,
                IUnitOfWork unitOfWork
            )
        {
            _mapper = mapper;
            _roomService = roomService;
            _unitOfWork = unitOfWork;
        }

        [HttpPost("create")]
        public async Task<ActionResult> Register([FromBody] CreateRoomRequest createRoomRequest)
        {
            var userId = User.FindFirst("sub")?.Value;

            if (userId == null)
            {
                return Unauthorized();
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

        [HttpGet]
        public async Task<ActionResult> CreateRoom()
        {
            // TODO: лооіку перевірки користувача ва окремий сервіс
            // TODO: перенести у сервіс
            // TODO: в ідеалі робити мапінг (щоб id не кидати) і лишнє також
            var userId = User.FindFirst("sub")?.Value;

            if (userId == null)
            {
                return Unauthorized();
            }

            var guidUserId = Guid.Parse(userId);

            var rooms = await _unitOfWork.RoomUserRepository.GetRoomsByUserId(guidUserId);

            return Ok(rooms);
        }
    }
}
