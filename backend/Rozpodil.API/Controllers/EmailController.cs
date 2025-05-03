using Microsoft.AspNetCore.Mvc;
using Rozpodil.API.Dtos.Responses;
using Rozpodil.Application.Interfaces.Services;

namespace Rozpodil.API.Controllers
{
    [ApiController]
    [Route("api")]
    public class EmailController: ControllerBase
    {
        IEmailValidationService _emailValidationService;
        public EmailController(
                IEmailValidationService emailValidationService
            )
        {
            _emailValidationService = emailValidationService;
        }

        [HttpGet("check-email")]
        public async Task<ActionResult<EmailTakenResponse>> CheckEmailExists([FromQuery] string email)
        {
            var result = await _emailValidationService.IsEmailTakenAsync(email);

            if (result.Success)
            {
                return Ok(result.Data);
            }

            return BadRequest();
        }
    }
}
