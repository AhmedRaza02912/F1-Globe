using System.Text.Json;
using FormulaOne.API.Models;
namespace FormulaOne.API.Services
{
    public class CircuitMetadataService : ICircuitMetadataService
    {
        private readonly IWebHostEnvironment _environment;
        private List<CircuitMetadata>? _metadata;
        public CircuitMetadataService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        private async Task LoadAsync()
        {
            if(_metadata !=null) return;
            var path = Path.Combine(
                _environment.ContentRootPath, "Data", "CircuitMetadata.json"
            );
            var json = await File.ReadAllTextAsync(path);
            _metadata = JsonSerializer.Deserialize<List<CircuitMetadata>>(json);
        }

        public async Task<CircuitMetadata?> GetMetadataAsync(string circuitId)
{
    await LoadAsync();


    var result = _metadata?.FirstOrDefault(x => x.CircuitId == circuitId);

    return result;
}
    }
}

