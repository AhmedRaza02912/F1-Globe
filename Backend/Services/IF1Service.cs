using FormulaOne.API.Models;

namespace FormulaOne.API.Services
{
    public interface IF1Service
    {
        Task<List<ActiveCircuitDto>> GetActiveCircuitsAsync(int season);
    }
}