using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Rozpodil.API.Dtos.Requests;
using Rozpodil.API.Dtos.Responses;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Common;
using Rozpodil.Application.Common.Interfaces;
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


        public AuthController(
                IMapper mapper,
                IAuthService authService,
                IJwtTokenService jwtTokenService,
                IRefreshTokenService refreshTokenService
            )
        {
            _mapper = mapper;
            _authService = authService;
            _jwtTokenService = jwtTokenService;
            _refreshTokenService = refreshTokenService;
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
        public async Task<ActionResult<TokensResponse>> VerifyEmail([FromBody] EmailConfirmationRequest emailConfirmationRequest)
        {
            EmailVerificationModel emailVerificationModel = _mapper.Map<EmailVerificationModel>(emailConfirmationRequest);

            Result<Guid, ErrorType> result = await _authService.VerifyEmailAsync(emailVerificationModel);

            if (result.Success)
            {
                var accessToken = _jwtTokenService.GenerateToken(result.Data);

                var refreshToken = await _refreshTokenService.GenerateAsync(result.Data, 7);

                var tokensResponse = new TokensResponse(
                    accessToken,
                    refreshToken
                );

                return Ok(tokensResponse);
            }
            
            return BadRequest();
        }
    }
}
