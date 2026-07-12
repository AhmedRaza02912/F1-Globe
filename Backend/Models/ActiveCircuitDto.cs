namespace FormulaOne.API.Models
{
    public class ActiveCircuitDto
    {
        public int Round{get;set;}
        public string RaceName{get;set;} = string.Empty;
        public string Date{get;set;} = string.Empty;
        public string CircuitId{get;set;} = string.Empty;
        public string CircuitName{get;set;} = string.Empty;
        public string Lat{get;set;} = string.Empty;
        public string Long{get;set;} = string.Empty;
        public string Country{get;set;} = string.Empty;
        public string Locality{get;set;} = string.Empty;
        public int Laps{get;set;}
        public double LengthKm{get;set;}
        public double RaceDistanceKm{get;set;}
        public int FirstGrandPrix{get;set;}
        
    }
}