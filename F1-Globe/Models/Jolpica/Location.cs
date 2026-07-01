using System.Text.Json.Serialization;

namespace FormulaOne.API.Models.Jolpica
{
    public class Location
    {
        [JsonPropertyName("lat")]
        public string Latitude{get;set;} = string.Empty;

        [JsonPropertyName("long")]
        public string Longitude{get;set;} = string.Empty;

        [JsonPropertyName("locality")]
        public string Locality{get;set;} = string.Empty;

        [JsonPropertyName("country")]
        public string Country{get;set;} = string.Empty;
    }
}