namespace FormulaOne.API.Models
{
    public class CircuitDto
    {
        public int Round{get;set;}
        public string RaceName{get;set;} = string.Empty;
        public string CircuitId{get;set;} = string.Empty;

        public string CircuitName{get;set;} = string.Empty;

        public string Country{get;set;} = string.Empty;

        public string City{get;set;} =string.Empty;

        public double Latitude{get;set;}
        public double Longitude{get;set;}
        public DateTime RaceDate{get;set;}
    }
}