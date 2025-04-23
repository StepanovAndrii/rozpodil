using AutoMapper;
using Rozpodil.Application.Common.Interfaces;
using Rozpodil.Application.Interfaces;
using Rozpodil.Application.Models;
using Rozpodil.Domain.Entities;
using Rozpodil.Domain.Repositories;

namespace Rozpodil.Infrastructure.Services
{
    public class RefreshTokenService
    {
        IUnitOfWork _unitOfWork;
        IDateTimeProvider _dateTimeProvider;
        ITokenGenerator _tokenGenerator;
        IMapper _mapper;

        public RefreshTokenService(
                IUnitOfWork unitOfWork,
                IDateTimeProvider dateTimeProvider,
                ITokenGenerator tokenGenerator,
                IMapper mapper
            )
        {
            _unitOfWork = unitOfWork;
            _dateTimeProvider = dateTimeProvider;
            _tokenGenerator = tokenGenerator;
            _mapper = mapper;
        }

        public async Task<string> GenerateAsync(
                Guid userId,
                int expirationDays,
                CancellationToken cancellationToken = default
            )
        {
            // TODO: розібратись з CancellationToken
            var user = await _unitOfWork.RefreshTokenRepository.GetByUserId(userId);
            if (user == null) {
                throw new UnauthorizedAccessException("User is not active or does not exist.");
            }

            var refreshToken = _tokenGenerator.Generate();
            var expires = _dateTimeProvider.UtcNow.AddDays(expirationDays);

            var refreshTokenModel = new RefreshTokenModel
            {
                UserId = userId,
                Token = refreshToken,
                ExpiresAt = expires
            };

            var refreshTokenEntity = _mapper.Map<RefreshToken>(refreshTokenModel);

            await _unitOfWork.RefreshTokenRepository.CreateAsync(refreshTokenEntity);
            await _unitOfWork.SaveChangesAsync();

            return 
        }
    }
}
