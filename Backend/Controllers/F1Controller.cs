using Microsoft.AspNetCore.Mvc;
using FormulaOne.API.Services;
using FormulaOne.API.Models;

namespace FormulaOne.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class F1Controller : ControllerBase
    {
        private readonly IF1Service _f1Service;

        public F1Controller(IF1Service f1Service)
        {
            _f1Service = f1Service;
            
        }

        [HttpGet("active-circuits/{season}")]
        public async Task<ActionResult<List<ActiveCircuitDto>>> GetActiveCircuits(int season)
        {
            var circuits = await _f1Service.GetActiveCircuitsAsync(season);

            return Ok(circuits);
        }

        
    }
}