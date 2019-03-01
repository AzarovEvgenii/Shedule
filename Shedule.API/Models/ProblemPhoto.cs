using System;

namespace Shedule.API.Models
{
    public class ProblemPhoto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime TimeAdded { get; set; }
        public bool IsMain { get; set; }
        public string PublicId {get; set;}
        public Problem Problem { get; set; }
        public int ProblemId { get; set; }
    }
}