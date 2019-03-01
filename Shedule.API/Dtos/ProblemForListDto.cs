using System;
using System.Collections.Generic;

namespace Shedule.API.Dtos
{
    public class ProblemForListDto
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public DateTime Created { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<ProblemPhotoForDetailed> Photos {get;set;}

    }
}