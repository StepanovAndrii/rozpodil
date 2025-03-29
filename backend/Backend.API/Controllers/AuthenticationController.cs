using Microsoft.AspNetCore.Mvc;
using Backend.Application.Abstracts;

namespace Backend.API.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AuthenticationController (
                IAccountService accountService
        ) : ControllerBase
    {

        //[HttpPost]
        //[Route("register")]
        //public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
        //{
        //    await accountService.RegisterAsync(registerRequest);

        //    return Ok();
        //}

        //[HttpPost]
        //[Route("login")]
        //public async Task<IActionResult> Login([FromBody] LoginRequest loginReques)
        //{
        //    await accountService.LoginAsync(loginReques);

        //    return Ok();
        //}

        [HttpPost]
        [Route("refresh")]
        public async Task<IActionResult> Refresh([FromBody] HttpContext httpContext)
        {
            var refreshToken = httpContext.Request.Cookies["REFRESH_TOKEN"];

            await accountService.RefreshTokenAsync(refreshToken);

            return Ok();
        }
    }
}
