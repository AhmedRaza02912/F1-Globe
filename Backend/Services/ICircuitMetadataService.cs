using FormulaOne.API.Models;

namespace FormulaOne.API.Services
{
    public interface ICircuitMetadataService
    {
        Task<CircuitMetadata?> GetMetadataAsync(string circuitId);
    }
}