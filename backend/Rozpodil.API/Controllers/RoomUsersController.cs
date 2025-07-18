﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rozpodil.API.Dtos.Responses;
using Rozpodil.Application.Interfaces.Repositories;
using Rozpodil.Application.Models.Dtos;

namespace Rozpodil.API.Controllers
{
    [AllowAnonymous]
    [Route("api/rooms/{roomId}/users")]
    [ApiController]
    public class RoomUsersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public RoomUsersController(
                IUnitOfWork unitOfWork,
                IMapper mapper
            ) {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<UserWithRoles>>> GetUsersRoles(
           Guid roomId
        )
        {
            var usersRoles = await _unitOfWork.RoomUserRepository.GetUsersWithRolesInRoomAsync(roomId);

            if (usersRoles != null)
                return Ok(usersRoles);

            return StatusCode(500);
        }

        [HttpDelete("{userId}")]
        public async Task<ActionResult> DeleteUserFromRoom(Guid roomId, Guid userId)
        {
            var roomUser = await _unitOfWork.RoomUserRepository.GetUserRoomAsync(roomId, userId);

            if (roomUser == null)
                return NoContent();

            await _unitOfWork.RoomUserRepository.DeleteUserRoom(roomUser);

            if (await _unitOfWork.RoomUserRepository.GetUsersInRoomCountAsync(roomUser.RoomId) == 0)
            {
                await _unitOfWork.RoomRepository.DeleteRoom(roomUser.Room);
            }

            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }
    }
}
