using Microsoft.AspNetCore.Mvc;
using FormulaOne.API.Services;

namespace FormulaOne.API.Controllers
{
    [ApiController]
    [Route("api/f1")]
    public class TempController : ControllerBase
    {
       
 [HttpGet("metadata/{id}")]
        public async Task<IActionResult> GetMetadata(string id, [FromServices]ICircuitMetadataService metadataService)
        {
            var metadata = await metadataService.GetMetadataAsync(id);

            return Ok(metadata);
        }
    }
}