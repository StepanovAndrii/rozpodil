using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rozpodil.API.Dtos.Requests.Room;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Interfaces.Repositories;
using Rozpodil.Application.Interfaces.Services;
using Rozpodil.Domain.Entities;

namespace Rozpodil.API.Controllers
{
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
                return Accepted(result.Data);
            }

            return BadRequest();
        }

        [HttpPost("join")]
        public async Task<ActionResult<Room>> JoinRoom([FromBody] JoinRoomRequest joinRoomRequest)
        {
            // TODO: додати перевірку чи присутній вже користувач
            var room = await this._unitOfWork.RoomRepository.GetRoomByCode(joinRoomRequest.Code);

            if (room == null)
                return NotFound();

            return Ok(room);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoomById(Guid id)
        {
            var room = await _unitOfWork.RoomRepository.GetRoomById(id);

            if (room == null)
                return NotFound();

            return Ok(room);
        }
    }
}
