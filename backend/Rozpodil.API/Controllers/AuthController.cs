using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Rozpodil.API.Dtos.Requests.Auth;
using Rozpodil.API.Dtos.Responses;
using Rozpodil.Application.Commands;
using Rozpodil.Application.Common;
using Rozpodil.Application.Interfaces.Auth;

namespace Rozpodil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;
        private readonly IOAuthService _oauthService;

        public AuthController(
                IMapper mapper,
                IAuthService authService,
                IOAuthService oAuthService
            )
        {
            _mapper = mapper;
            _authService = authService;
            _oauthService = oAuthService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterUserRequest registerUserRequest)
        {
            var registerUserCommand = _mapper.Map<RegisterUserCommand>(registerUserRequest);
            var result = await _authService.RegisterUser(registerUserCommand);

            if (result.Success)
            {
                return Accepted();
            }

            return result.Error switch
            {
                ErrorType.Conflict => Conflict(),
                ErrorType.Internal => StatusCode(500)
            };
        }

        [HttpGet("login")]
        public async Task<ActionResult> Login([FromQuery] LoginUserRequest loginUserRequest)
        {
            var loginUserCommand = _mapper.Map<LoginCommand>(loginUserRequest);
            var result = await _authService.LoginUserAsync(loginUserCommand, 7);

            if (result.Success)
            {
                return Ok(_mapper.Map<AccessTokenResponse>(result.Data));
            }

            return BadRequest();
        }

        [HttpPost("oauth")]
        public async Task<ActionResult<AccessTokenResponse>> AuthenticateWithProvider (
                [FromBody] ExternalAuthenticationRequest externalAuthenticationRequest
            )
        {
            var externalAuthenticationCommand = _mapper.Map<ExternalAuthenticationCommand>(externalAuthenticationRequest);
            var result = await _oauthService.AuthenticateExternalUserAsync(externalAuthenticationCommand);

            if (result.Success)
            {
                return Ok(_mapper.Map<AccessTokenResponse>(result.Data));
            }

            return BadRequest(result.Error);
        }

        [HttpPost("verify-code")]
        public async Task<ActionResult<AccessTokenResponse>> VerifyEmailAndLogin ([FromBody] EmailConfirmationRequest emailConfirmationRequest)
        {
            var emailVerificationCommand = _mapper.Map<EmailConfirmationCommand>(emailConfirmationRequest);
            var result = await _authService.VerifyEmailAndLoginAsync(emailVerificationCommand, 7);

            if (result.Success)
            {
                return Ok(_mapper.Map<AccessTokenResponse>(result.Data));
            }
            
            return BadRequest();
        }

        [HttpPost("resend-email")]
        public async Task<ActionResult> ResendEmailVerificationCode(
                ResendEmailConfirmationCodeRequest resendEmailConfirmationCodeRequest
            )
        {
            var resendEmailConfirmationCodeCommand = _mapper.Map<ResendEmailConfirmationCodeCommand>(resendEmailConfirmationCodeRequest);
            var result = await _authService.ResendEmailVerificationCode(resendEmailConfirmationCodeCommand);
            
            if (result.Success)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
