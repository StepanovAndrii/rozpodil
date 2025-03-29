using Backend.Application.Abstracts;
using Backend.Application.Exceptions;
using Backend.Logic.Entities;
using Backend.Persistence.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace Backend.Application.Services
{
    public class AccountService: IAccountService
    {
        private readonly IAuthTokenProcessor _authTokenProcessor;
        private readonly UserManager<UserEntity> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;

        public AccountService(IAuthTokenProcessor authTokenProcessor,
            UserManager<UserEntity> userManager,
            IConfiguration configuration,
            IUserRepository userRepository)
        {
            _authTokenProcessor = authTokenProcessor;
            _userManager = userManager;
            _configuration = configuration;
            _userRepository = userRepository;
        }

        //public async Task RegisterAsync(RegisterRequest registerRequest)
        //{
        //    var userExists = await _userManager.FindByEmailAsync(registerRequest.Email) != null;

        //    if (userExists)
        //    {
        //        throw new UserAlreadyExistsException(email: registerRequest.Email);
        //    }

        //    var user = UserEntity.Create(
        //        email: registerRequest.Email);
        //    user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, registerRequest.Password);

        //    var result = await _userManager.CreateAsync(user);

        //    if (!result.Succeeded)
        //    {
        //        throw new RegistrationFailedException(result.Errors.Select(exception => exception.Description));
        //    }
        //}
        
      /*  public async Task LoginAsync(LoginRequest loginRequest)
        {
            var user = await _userManager.FindByEmailAsync(loginRequest.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginRequest.Password))
            {
                throw new LoginFailedException(loginRequest.Email);
            }

            var (jwtToken, expirationDateInUtc) = _authTokenProcessor.GenerateJwtToken(user);
            var refreshTokenValue = _authTokenProcessor.GenerateRefreshToken();

            var refreshTokenExpirationDateInUtc = DateTime.UtcNow.AddDays((_configuration.GetValue<double>("RefreshTokenOptions:ExpirationTimeInDays")));

            user.RefreshToken = refreshTokenValue;
            user.RefreshTokenExpiresAtUtc = refreshTokenExpirationDateInUtc;

            await _userManager.UpdateAsync(user);

            _authTokenProcessor.WriteAuthTokenAsHttpOnlyCookie("ACCESS_TOKEN", jwtToken, expirationDateInUtc);
            _authTokenProcessor.WriteAuthTokenAsHttpOnlyCookie("REFRESH_TOKEN", user.RefreshToken, refreshTokenExpirationDateInUtc);
        }*/

        public async Task RefreshTokenAsync(string? refreshToken)
        {
            if (string.IsNullOrEmpty(refreshToken))
            {
                throw new RefreshTokenException("Refresh token is missing");
            }

            var user = await _userRepository.GetUserByRefreshTokenAsync(refreshToken);

            if (user == null)
            {
                throw new RefreshTokenException("Unable to retrieve user for refresh token");
            }

            if (user.RefreshTokenExpiresAtUtc < DateTime.UtcNow)
            {
                throw new RefreshTokenException("Refresh token is expired");
            }

            var (jwtToken, expirationDateInUtc) = _authTokenProcessor.GenerateJwtToken(user);
            var refreshTokenValue = _authTokenProcessor.GenerateRefreshToken();

            var refreshTokenExpirationDateInUtc = DateTime.UtcNow.AddDays((_configuration.GetValue<double>("RefreshTokenOptions:ExpirationTimeInDays")));

            user.RefreshToken = refreshTokenValue;
            user.RefreshTokenExpiresAtUtc = refreshTokenExpirationDateInUtc;

            await _userManager.UpdateAsync(user);

            _authTokenProcessor.WriteAuthTokenAsHttpOnlyCookie("ACCESS_TOKEN", jwtToken, expirationDateInUtc);
            _authTokenProcessor.WriteAuthTokenAsHttpOnlyCookie("REFRESH_TOKEN", user.RefreshToken, refreshTokenExpirationDateInUtc);
        }
        
    }
}
