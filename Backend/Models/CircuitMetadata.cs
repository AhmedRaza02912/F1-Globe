using System.Text.Json.Serialization;

namespace FormulaOne.API.Models
{
    public class CircuitMetadata
    {
        [JsonPropertyName("circuitId")]
        public string CircuitId { get; set; } = string.Empty;

        [JsonPropertyName("laps")]
        public int Laps { get; set; }

        [JsonPropertyName("lengthKm")]
        public double LengthKm { get; set; }

        [JsonPropertyName("raceDistanceKm")]
        public double RaceDistanceKm { get; set; }

        [JsonPropertyName("firstGrandPrix")]
        public int FirstGrandPrix { get; set; }
    }
}