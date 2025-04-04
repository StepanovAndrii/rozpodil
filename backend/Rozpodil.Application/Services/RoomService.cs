using Rozpodil.Domain.Repositories;

namespace Rozpodil.Application.Services
{
    public class RoomService
    {
        private readonly IRoomRepository _repository;
        public RoomService(
            IRoomRepository repository
            )
        {
            _repository = repository;
        }

        public async void GetRoomsByUserId(Guid userId)
        {
            await _repository.GetRoomsByUserIdAsync(userId);
        }
    }
}
