using AutoMapper;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Common;
using Rozpodil.Application.Common.Interfaces;
using Rozpodil.Application.Common.Utilities;
using Rozpodil.Application.Interfaces.Auth;
using Rozpodil.Application.Interfaces.Repositories;
using Rozpodil.Application.Interfaces.Services;
using Rozpodil.Application.Models;
using Rozpodil.Domain.Entities;
using Rozpodil.Domain.Enums;

namespace Rozpodil.Application.Services
{
    public class RoomService: IRoomService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ICodeGeneratorService _codeGeneratorService;
        private readonly ITransactionManager _transactionManager;
        public RoomService(
                IUnitOfWork unitOfWork,
                IMapper mapper,
                ICodeGeneratorService codeGeneratorService,
                ITransactionManager transactionManager
            )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _codeGeneratorService = codeGeneratorService;
            _transactionManager = transactionManager;
        }

        public async Task<Result<Guid, ErrorType>> CreateRoomAsync(CreateRoomCommand createRoomCommand, Guid userId)
        {
            // TODO: перевірити в якому порядку і які параметри робити мапінг
            var createUserModel = _mapper.Map<RoomCreationModel>(createRoomCommand);

            var roomCode = _codeGeneratorService.GenerateCode();
            var roomId = GuidGenerator.Generate();

            createUserModel.Code = roomCode;
            createUserModel.Id = roomId;

            var room = _mapper.Map<Room>(createUserModel);
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);
            var roomUser = new RoomUser
            {
                User = user,
                Room = room,
                Role = RoomRole.Owner
            };

            await _transactionManager.ExecuteInTransactionAsync(async () =>
            {
                await _unitOfWork.RoomRepository.CreateRoomAsync(room);
                await _unitOfWork.RoomUserRepository.CreateRoomUserAsync(roomUser);
                await _unitOfWork.SaveChangesAsync();
            });

            return Result<Guid, ErrorType>.Ok(room.Id);
        }
    }
}
