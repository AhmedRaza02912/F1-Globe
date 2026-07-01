using System.Text.Json.Serialization;

namespace FormulaOne.API.Models.Jolpica
{
    public class Circuit
    {
        [JsonPropertyName("CircuitId")]
        public string CircuitId{get;set;} = string.Empty;

        [JsonPropertyName("circuitName")]
        public string CircuitName{get;set;} = string.Empty;

        [JsonPropertyName("Location")]
        public Location Location{get;set;} = new();
    }
}