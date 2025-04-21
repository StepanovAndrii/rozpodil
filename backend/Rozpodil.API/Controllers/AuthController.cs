using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Rozpodil.API.Dtos.Requests;
using Rozpodil.Application.Common;
using Rozpodil.Application.Models;
using Rozpodil.Application.Services;
using Rozpodil.Application.Services.Interfaces;

namespace Rozpodil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;

        public AuthController(
            IMapper mapper,
            IAuthService authService
            )
        {
            _mapper = mapper;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterUserRequest registerUserRequest)
        {
            UserModel userModel = _mapper.Map<UserModel>(registerUserRequest);
            UserCredentialsModel userCredentialsModel = _mapper.Map<UserCredentialsModel>(registerUserRequest);

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

            Result<ErrorType> result = await _authService.VerifyEmailAsync(emailVerificationModel);

            if (result.Success)
            {
                return Ok();
            }
            
            return BadRequest();
        }
    }
}
