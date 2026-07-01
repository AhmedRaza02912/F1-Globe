using System.Text.Json.Serialization;
namespace FormulaOne.API.Models.Jolpica
{
    public class RaceTable
    {
        [JsonPropertyName("Races")]
        public List<Race> Races{get;set;} = new();
    }
}