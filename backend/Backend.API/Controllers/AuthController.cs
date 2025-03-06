using Backend.API.Contracts;
using Backend.Application;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private AuthService _authService;

        public AuthController(AuthService authService)
        {
            this._authService = authService;
        }

        [HttpPost("exchange-code")]
        public async ActionResult ExchangeAuthorizationCode([FromBody] AccessAndVerifierCodeDto request)
        {
            Response.Cookies.Append("user_token", _authService.TryGetToken(request.code, request.codeVerifier);)
            return Ok();
        }
    }
}
