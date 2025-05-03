using AutoMapper;
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

        [HttpPost("refresh")]
        public async Task<ActionResult<AccessTokenResponse>> RefreshToken()
        {
            if (Request.Cookies.TryGetValue("RefreshToken", out string? refreshToken))
            {
                var result = await _tokenManager.RefreshToken(refreshToken);

                if (result.Error == ErrorType.Unauthorized)
                {
                    return Unauthorized();
                }

                var accessTokenModel = result.Data;
                var accessTokenResponce = _mapper.Map<AccessTokenResponse>(accessTokenModel);
                return Ok(accessTokenResponce);
            }

            return Unauthorized();
        }
    }
}
