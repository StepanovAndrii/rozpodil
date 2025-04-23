using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Rozpodil.API.Dtos.Requests;
using Rozpodil.Application.Common;
using Rozpodil.Application.Common.Utilities;
using Rozpodil.Application.Interfaces;
using Rozpodil.Application.Models;
using Rozpodil.Application.Services.Interfaces;

namespace Rozpodil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthController(
            IMapper mapper,
            IAuthService authService,
            IJwtTokenService jwtTokenService
            )
        {
            _mapper = mapper;
            _authService = authService;
            _jwtTokenService = jwtTokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterUserRequest registerUserRequest)
        {
            Guid userId = GuidGenerator.Generate();

            UserModel userModel = _mapper.Map<UserModel>(registerUserRequest, options =>
            {
                options.Items["UserId"] = userId;
            });
            UserCredentialsModel userCredentialsModel = _mapper.Map<UserCredentialsModel>(registerUserRequest, options =>
            {
                options.Items["UserId"] = userId;
            });

            Result<ErrorType> result = await _authService.RegisterUser(userModel, userCredentialsModel);

            if (result.Success)
            {
                return Accepted();
            }

            return BadRequest();
        }

        [HttpPost("verify-code")]
        public async Task<ActionResult> VerifyEmail([FromBody] EmailConfirmationRequest emailConfirmationRequest)
        {
            EmailVerificationModel emailVerificationModel = _mapper.Map<EmailVerificationModel>(emailConfirmationRequest);

            Result<Guid, ErrorType> result = await _authService.VerifyEmailAsync(emailVerificationModel);

            if (result.Success)
            {
                var accessToken = _jwtTokenService.GenerateToken(result.Data);
                var refreshToken = 
                return Ok();
            }
            
            return BadRequest();
        }
    }
}
