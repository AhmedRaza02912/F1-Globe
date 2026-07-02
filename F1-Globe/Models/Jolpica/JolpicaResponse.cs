using System.Text.Json.Serialization;

namespace FormulaOne.API.Models.Jolpica
{
    public class JolpicaResponse
    {
        [JsonPropertyName("MRData")]
        public MRData MRData {get;set;} = new();
    }
}