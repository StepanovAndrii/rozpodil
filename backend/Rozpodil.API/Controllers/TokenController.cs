using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rozpodil.API.Dtos.Responses;
using Rozpodil.Application.Common;
using Rozpodil.Application.Interfaces;

namespace Rozpodil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly ITokenManager _tokenManager;
        private readonly IMapper _mapper;
        public TokenController(
                ITokenManager tokenManager,
                IMapper mapper
            )
        {
            _tokenManager = tokenManager;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet("validate-access-token")]
        public async Task<ActionResult<bool>> ValidateAccessToken()
        {
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("refresh")]
        public async Task<ActionResult<object>> RefreshToken()
        {
            Console.WriteLine("ватаілщвтшщ");
            if (Request.Cookies.TryGetValue("RefreshToken", out string? refreshToken))
            {
                Console.WriteLine(refreshToken + "ТУТ");
                var result = await _tokenManager.RefreshToken(refreshToken);

                if (result.Error == ErrorType.Unauthorized)
                {
                    return Unauthorized();
                }
                // TODO: переробити тут все

                var accessTokenModel = result.Data;
                return Ok(new { accessToken = accessTokenModel.AccessToken });
            }

            return Unauthorized();
        }

        [HttpDelete("delete-refresh")]
        public ActionResult DeleteRefreshToken()
        {
            Response.Cookies.Delete("RefreshToken");
            return Ok();
        }
    }
}
