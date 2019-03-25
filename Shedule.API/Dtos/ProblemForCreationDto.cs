using System;

namespace Shedule.API.Dtos
{
    public class ProblemForCreationDto
    {
        public string Type { get; set; }
        public int Degree { get; set; }
        public string Description { get; set; }
        public DateTime TimeHappened { get; set; }
        public DateTime Created { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Address { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public ProblemForCreationDto()
        {
            Created = DateTime.Now;
        }
    }
}