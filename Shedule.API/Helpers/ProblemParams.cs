namespace Shedule.API.Helpers
{
    public class ProblemParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public int UserId { get; set; }
        public int ProblemId { get; set; }
        public string Type { get; set; }
        // public string OrderBy { get; set; }
    }
}