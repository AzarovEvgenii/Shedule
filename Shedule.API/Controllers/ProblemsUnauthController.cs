using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Shedule.API.Data;
using Shedule.API.Dtos;
using Shedule.API.Helpers;

namespace Shedule.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProblemsUnauthController:ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDatingRepository _repo;

        public ProblemsUnauthController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetProblems([FromQuery]ProblemParams problemParams)
        {
            var problems = await _repo.GetProblems(problemParams);

            var problemsToReturn = _mapper.Map<IEnumerable<ProblemForListDto>>(problems);

            Response.AddPagination(problems.CurrentPage, problems.PageSize,
            problems.TotalCount, problems.TotalPages);

            return Ok(problemsToReturn);
        }
    }
}