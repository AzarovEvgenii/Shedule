using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shedule.API.Helpers;
using Shedule.API.Models;

namespace Shedule.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;

        public DatingRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(u => u.UserId == userId)
            .FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }

        public async Task<ProblemPhoto> GetProblemPhoto(int id)
        {
            var photo = await _context.ProblemPhotos.FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(p => p.Photos).Include(p => p.Problems).FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(p => p.Photos).Include(p => p.Problems).ToListAsync();
            return users;
        }

        public async Task<Problem> GetProblem(int id)
        {
            var problem = await _context.Problems.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);

            return problem;
        }

        public async Task<PagedList<Problem>> GetProblems(ProblemParams problemParams)
        {
            var problems = _context.Problems.Include(p => p.Photos).AsQueryable();

            if (problemParams.UserId != 0)
                problems = problems.Where(p => p.UserId == problemParams.UserId);

            return await PagedList<Problem>.CreateAsync(problems, problemParams.PageNumber, problemParams.PageSize);
        }

        public async Task<PagedList<Problem>> GetProblemsMy(int id, ProblemParams problemParams)
        {
            var problems = _context.Problems.Include(p => p.Photos).Where(p => p.UserId == id);

            return await PagedList<Problem>.CreateAsync(problems, problemParams.PageNumber, problemParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() >= 0;
        }

        public async Task<ProblemPhoto> GetMainPhotoForProblem(int problemId)
        {
            return await _context.ProblemPhotos.Where(u => u.ProblemId == problemId)
           .FirstOrDefaultAsync(p => p.IsMain);
        }
    }
}