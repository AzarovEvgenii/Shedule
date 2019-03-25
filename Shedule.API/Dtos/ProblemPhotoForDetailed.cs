using System;

namespace Shedule.API.Dtos
{
    public class ProblemPhotoForDetailedDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime TimeAdded { get; set; }
        public bool IsMain { get; set; }
    }
}