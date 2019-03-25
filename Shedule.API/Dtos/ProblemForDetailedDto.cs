using System;
using System.Collections.Generic;

namespace Shedule.API.Dtos
{
    public class ProblemForDetailedDto
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public int Degree { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public DateTime TimeHappened { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Address { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public string PhotoUrl { get; set; }
        public int UserId { get; set; }
        public ICollection<ProblemPhotoForDetailedDto> Photos { get; set; }
    }
}