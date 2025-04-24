using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Rozpodil.API.Dtos.Requests;
using Rozpodil.API.Dtos.Responses;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Common;
using Rozpodil.Application.Interfaces;
using Rozpodil.Application.Models;

namespace Rozpodil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IRefreshTokenService _refreshTokenService;
        private readonly ICookieService _cookieService;

        public AuthController(
                IMapper mapper,
                IAuthService authService,
                IJwtTokenService jwtTokenService,
                IRefreshTokenService refreshTokenService,
                ICookieService cookieService
            )
        {
            _mapper = mapper;
            _authService = authService;
            _jwtTokenService = jwtTokenService;
            _refreshTokenService = refreshTokenService;
            _cookieService = cookieService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterUserRequest registerUserRequest)
        {
            var registerUserCommand = _mapper.Map<RegisterUserCommand>(registerUserRequest);
            Result<ErrorType> result = await _authService.RegisterUser(registerUserCommand);

            if (result.Success)
            {
                return Accepted();
            }

            return BadRequest();
        }

        [HttpPost("verify-code")]
        public async Task<ActionResult<AccessTokenResponse>> VerifyEmail([FromBody] EmailConfirmationRequest emailConfirmationRequest)
        {
            int expiredAtDays = 7;

            EmailVerificationModel emailVerificationModel = _mapper.Map<EmailVerificationModel>(emailConfirmationRequest);

            Result<Guid, ErrorType> result = await _authService.VerifyEmailAsync(emailVerificationModel);

            if (result.Success)
            {
                var accessToken = _jwtTokenService.GenerateToken(result.Data);
                var refreshToken = await _refreshTokenService.GenerateAsync(result.Data, expiredAtDays);

                _cookieService.SetRefreshToken(refreshToken, expiredAtDays);

                return Ok(
                    new AccessTokenResponse(accessToken)
                );
            }
            
            return BadRequest();
        }
    }
}
