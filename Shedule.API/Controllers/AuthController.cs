using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Shedule.API.Data;
using Shedule.API.Models;
using Shedule.API.Dtos;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Shedule.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper, ILogger<AuthController> logger)
        {
            _repo = repo;
            _config = config;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            try
            {
                userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

                if (await _repo.UserExists(userForRegisterDto.Username))
                    return BadRequest("Username already exists");

                var userToCreate = _mapper.Map<User>(userForRegisterDto);

                User createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

                UserForDetailedDto userToReturn = _mapper.Map<UserForDetailedDto>(createdUser);

                return CreatedAtRoute("GetUser", new { Controller = "Users", id = createdUser.Id }, userToReturn); // Why redirecting?
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.ToString());
                return BadRequest($"Something goes wrong.");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var user = _mapper.Map<UserForListDto>(userFromRepo);

            return Ok(new

            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }
    }
}