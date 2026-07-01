using FormulaOne.API.Models;
namespace FormulaOne.API.Services
{
    public class F1Service : IF1Service
    {
        private readonly HttpClient _httpClient;
        public F1Service(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<CircuitDto>> GetActiveCircuitsAsync(int season)
        {
            throw new NotImplementedException();
        }
    }
}