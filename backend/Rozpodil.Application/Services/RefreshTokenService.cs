using AutoMapper;
using Rozpodil.Application.Common.Enums;
using Rozpodil.Application.Common.Interfaces;
using Rozpodil.Application.Interfaces;
using Rozpodil.Application.Interfaces.Auth.AuthContext;
using Rozpodil.Application.Interfaces.Security;
using Rozpodil.Application.Models;
using Rozpodil.Domain.Entities;

namespace Rozpodil.Infrastructure.Services
{
    public class RefreshTokenService: IRefreshTokenService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDateTimeProvider _dateTimeProvider;
        private readonly ITokenGenerator _tokenGenerator;
        private readonly IMapper _mapper;
        private readonly IHasherService _hasherService;

        public RefreshTokenService(
                IUnitOfWork unitOfWork,
                IDateTimeProvider dateTimeProvider,
                ITokenGenerator tokenGenerator,
                IMapper mapper,
                IHasherFactory hasherFactory
            )
        {
            _unitOfWork = unitOfWork;
            _dateTimeProvider = dateTimeProvider;
            _tokenGenerator = tokenGenerator;
            _mapper = mapper;
            _hasherService = hasherFactory.GetHasher(HasherType.Sha256);
        }

        public async Task<string> GenerateAsync(
                Guid userId,
                int expirationDays,
                CancellationToken cancellationToken = default
            )
        {
            // TODO: розібратись з CancellationToken
            var user = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);
            if (user == null) {
                throw new UnauthorizedAccessException("User is not active or does not exist.");
            }

            var refreshToken = _tokenGenerator.Generate();
            var hashedRefreshToken = _hasherService.Hash(refreshToken);
            var expires = _dateTimeProvider.UtcNow.AddDays(expirationDays);

            var refreshTokenModel = new RefreshTokenModel
            {
                UserId = userId,
                HashedToken = hashedRefreshToken,
                ExpiresAt = expires
            };

            var refreshTokenEntity = _mapper.Map<RefreshToken>(refreshTokenModel);

            await _unitOfWork.RefreshTokenRepository.CreateAsync(refreshTokenEntity);
            await _unitOfWork.SaveChangesAsync();

            return refreshToken;
        }
    }
}
