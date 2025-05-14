using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rozpodil.Application.Interfaces;

namespace Rozpodil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AchievementsController : ControllerBase
    {
        private readonly AchievementsService _achievementsService;

        public AchievementsController(AchievementsService achievementsService)
        {
            _achievementsService = achievementsService;
        }

        [HttpPost("grant")]
        public async Task<IActionResult> GrantAchievement([FromBody] string userId)
        {
            await _achievementsService.GrantAchievementAsync(userId);
            return Ok("Achievement granted.");
        }
    }
}
