using Microsoft.AspNetCore.Mvc;

namespace Rozpodil.API.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        [HttpGet]
        public ActionResult GetTasks() {
            return Ok();
        }
    }
}
