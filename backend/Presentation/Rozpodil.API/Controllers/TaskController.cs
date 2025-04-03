using Microsoft.AspNetCore.Mvc;

namespace Rozpodil.API.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        public Dictionary<string, string> Tasks = new Dictionary<string, string>()
        {
            { "name", "description" },
            { "name1", "description1" },
            { "name2", "description2" },
            { "name3", "description3" },
            { "name4", "description4" }
        };

        [HttpGet]
        public ActionResult GetTasks() {
            return Ok(Tasks);
        }
    }
}
