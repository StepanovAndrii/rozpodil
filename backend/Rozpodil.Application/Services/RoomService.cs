using Rozpodil.Application.Common;
using Rozpodil.Application.Interfaces;
using Rozpodil.Domain.Repositories;

namespace Rozpodil.Application.Services
{
    public class RoomService: IRoomService
    {
        private readonly IRoomRepository _repository;
        public RoomService(
            IRoomRepository repository
            )
        {
            _repository = repository;
        }

        //public async Task<Result<ErrorType>> CreateRoom()
        //{

        //}
    }
}
