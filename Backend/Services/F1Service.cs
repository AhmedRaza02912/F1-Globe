using FormulaOne.API.Models;
using System.Globalization;
using System.Net.Http.Json;
using FormulaOne.API.Models.Jolpica;
namespace FormulaOne.API.Services
{
    public class F1Service : IF1Service
    {
        private readonly HttpClient _httpClient;
        private readonly ICircuitMetadataService _metadataService;
        public F1Service(HttpClient httpClient, ICircuitMetadataService metadataService)
        {
            _httpClient = httpClient;
            _metadataService = metadataService;
        }

        public async Task<List<ActiveCircuitDto>> GetActiveCircuitsAsync(int season)
        {
            var url = $"https://api.jolpi.ca/ergast/f1/{season}/races/";

            var response = await _httpClient.GetFromJsonAsync<JolpicaResponse>(url);

            var json = await _httpClient.GetStringAsync(url);
            // System.Console.WriteLine(json);

            if(response?.MRData?.RaceTable?.Races == null)
            {
                return new List<ActiveCircuitDto>();
            }

            var activeCircuits = new List<ActiveCircuitDto>();

            foreach(var race in response.MRData.RaceTable.Races)
            {
                var metadata = await _metadataService.GetMetadataAsync(race.Circuit.CircuitId);

                activeCircuits.Add(new ActiveCircuitDto
                {
                    Round = int.Parse(race.Round),
                    RaceName = race.RaceName,
                    Date = race.Date,
                    CircuitId = race.Circuit.CircuitId,
                    CircuitName = race.Circuit.CircuitName,
                    Country = race.Circuit.Location.Country,
                    Locality = race.Circuit.Location.Locality,
                    Lat = race.Circuit.Location.Latitude,
                    Long = race.Circuit.Location.Longitude,
                    Laps = metadata?.Laps ?? 0,
                    LengthKm = metadata?.LengthKm ?? 0,
                    RaceDistanceKm = metadata?.RaceDistanceKm ?? 0,
                    FirstGrandPrix = metadata?.FirstGrandPrix ?? 0
                });
            }
            return activeCircuits;
        }
    }
}