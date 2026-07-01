using System.Text.Json.Serialization;

namespace FormulaOne.API.Models.Jolpica
{
    public class MRData
    {
        [JsonPropertyName("RaceTable")]
        public RaceTable RaceTable{get;set;} = new();
    }
}