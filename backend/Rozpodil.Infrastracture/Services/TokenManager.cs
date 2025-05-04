using Rozpodil.Application.Common;
using Rozpodil.Application.Common.Enums;
using Rozpodil.Application.Common.Interfaces;
using Rozpodil.Application.Interfaces;
using Rozpodil.Application.Interfaces.Auth.AuthContext;
using Rozpodil.Application.Interfaces.Repositories;
using Rozpodil.Application.Interfaces.Security;
using Rozpodil.Application.Models;
using Rozpodil.Application.Services;

namespace Rozpodil.Infrastructure.Services
{
    public class TokenManager: ITokenManager
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHasherService _hasherService;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly ITransactionManager _transactionManager;
        private readonly IRefreshTokenService _refreshTokenService;
        private readonly ICookieService _cookieService;
        public TokenManager(
                IUnitOfWork unitOfWork,
                IHasherFactory hasherFactory,
                IJwtTokenService jwtTokenService,
                ITransactionManager transactionManager,
                IRefreshTokenService refreshTokenService,
                ICookieService cookieService
            )
        {
            _unitOfWork = unitOfWork;
            _hasherService = hasherFactory.GetHasher(HasherType.Sha256);
            _jwtTokenService = jwtTokenService;
            _transactionManager = transactionManager;
            _refreshTokenService = refreshTokenService;
            _cookieService = cookieService;
        }

        // TODO: можливо зробити refresh токен окремою моделлю?
        // TODO: робити мапінги
        // TODO: прибрати говнокод (кукі збереження тут)
        public async Task<Result<AccessTokenModel, ErrorType>> RefreshToken(string refreshToken)
        {
            Console.WriteLine(_hasherService.Hash(refreshToken));
            var refreshTokenEntity = await _unitOfWork.RefreshTokenRepository.GetByHashedTokenAsync(
                    _hasherService.Hash(refreshToken)
                );

            if (refreshTokenEntity == null)
            {
                return Result<AccessTokenModel, ErrorType>.Fail(ErrorType.Unauthorized);
            }

            var user = refreshTokenEntity.User;

            var accessToken = _jwtTokenService.GenerateToken(user.Id);

            await _transactionManager.ExecuteInTransactionAsync(async () =>
            {
                await _unitOfWork.RefreshTokenRepository.DeleteRefreshToken(refreshTokenEntity);
                var newRefreshToken = await _refreshTokenService.GenerateAsync(
                    user.Id,
                    7
                );
                _cookieService.SetRefreshToken(newRefreshToken, 7);
                await _unitOfWork.SaveChangesAsync();
            });

            return Result<AccessTokenModel, ErrorType>.Ok(
                new AccessTokenModel
                {
                    AccessToken = accessToken
                }
            );
        }
    }
}

