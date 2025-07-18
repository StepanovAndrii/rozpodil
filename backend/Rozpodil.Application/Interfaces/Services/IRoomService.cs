﻿using Rozpodil.Application.Commands;
using Rozpodil.Application.Common;

namespace Rozpodil.Application.Interfaces.Services
{
    public interface IRoomService
    {
        Task<Result<Guid, ErrorType>> CreateRoomAsync(CreateRoomCommand createRoomCommand, Guid userId);
    }
}
