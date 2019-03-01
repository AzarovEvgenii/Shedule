using System;
using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shedule.API.Data;
using Shedule.API.Dtos;


namespace Shedule.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProblemsController:ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDatingRepository _repo;

        public ProblemsController(IDatingRepository repo, IMapper mapper){
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var problems = await _repo.GetProblems();

            var problemsToReturn = _mapper.Map<IEnumerable<ProblemForListDto>>(problems);

            return Ok(problemsToReturn);
        }
    }
}