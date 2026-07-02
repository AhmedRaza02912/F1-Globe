using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Components.Server.Circuits;

namespace FormulaOne.API.Models.Jolpica
{
    public class Race
    {
        [JsonPropertyName("round")]
        public string Round{get;set;} = string.Empty;

        [JsonPropertyName("raceName")]
        public string RaceName{get;set;} = string.Empty;

        [JsonPropertyName("date")]
        public string Date{get;set;} = string.Empty;

        [JsonPropertyName("Circuit")]
        public Circuit Circuit {get;set;} = new();
    }
}