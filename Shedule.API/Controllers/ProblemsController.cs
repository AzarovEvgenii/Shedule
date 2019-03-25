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
using Shedule.API.Helpers;
using Shedule.API.Models;

namespace Shedule.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProblemsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDatingRepository _repo;

        public ProblemsController(IDatingRepository repo, IMapper mapper)
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

        [HttpGet("my/{id}")]
        public async Task<IActionResult> GetProblemsMy(int id, [FromQuery]ProblemParams problemParams)
        {
            var problems = await _repo.GetProblemsMy(id, problemParams);

            var problemsToReturn = _mapper.Map<IEnumerable<ProblemForListDto>>(problems);

            Response.AddPagination(problems.CurrentPage, problems.PageSize,
            problems.TotalCount, problems.TotalPages);

            return Ok(problemsToReturn);
        }

        [HttpGet("{id}", Name = "GetProblem")]
        public async Task<IActionResult> GetProblem(int id)
        {
            var problem = await _repo.GetProblem(id);

            var problemToReturn = _mapper.Map<ProblemForDetailedDto>(problem);

            return Ok(problemToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProblem(int id, ProblemForUpdateDto problemForUpdateDto)
        {
            // if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var problemFromRepo = await _repo.GetProblem(id);

            _mapper.Map(problemForUpdateDto, problemFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");

        }

        [HttpPost("add/{id}")]
        public async Task<IActionResult> AddProblemForUser(int id,
        ProblemForCreationDto problemForCreationDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);

            var problem = _mapper.Map<Problem>(problemForCreationDto);

            userFromRepo.Problems.Add(problem);

            if (await _repo.SaveAll())
            {
                var problemToReturn = _mapper.Map<ProblemForDetailedDto>(problem);
                return CreatedAtRoute("GetProblem", new { id = problem.Id }, problemToReturn);
            }

            return BadRequest("Could not add the photo");
        }
    }
}