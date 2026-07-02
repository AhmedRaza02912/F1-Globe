using FormulaOne.API.Models;
using System.Globalization;
using System.Net.Http.Json;
using FormulaOne.API.Models.Jolpica;
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
            var url = $"https://api.jolpi.ca/ergast/f1/{season}/races/";

            var response = await _httpClient.GetFromJsonAsync<JolpicaResponse>(url);

            var json = await _httpClient.GetStringAsync(url);
            System.Console.WriteLine(json);

            if(response?.MRData?.RaceTable?.Races == null)
            {
                return new List<CircuitDto>();
            }

            return response.MRData.RaceTable.Races.Select(r => new CircuitDto
            {
                Round = int.Parse(r.Round),
                RaceName = r.RaceName,
                CircuitId = r.Circuit.CircuitId,
                CircuitName = r.Circuit.CircuitName,
                Country = r.Circuit.Location.Country,
                City = r.Circuit.Location.Locality,
                Latitude = double.Parse(r.Circuit.Location.Latitude, CultureInfo.InvariantCulture),
                Longitude = double.Parse(r.Circuit.Location.Longitude, CultureInfo.InvariantCulture),
                RaceDate = DateTime.Parse(r.Date)
            }).ToList();
        }
    }
}