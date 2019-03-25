using System.Collections.Generic;
using System.Threading.Tasks;
using Shedule.API.Helpers;
using Shedule.API.Models;

namespace Shedule.API.Data
{
    public interface IDatingRepository 
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<User>> GetUsers();
         Task<Problem> GetProblem(int id);
         Task<PagedList<Problem>> GetProblems(ProblemParams problemParams);
         Task<PagedList<Problem>> GetProblemsMy(int id ,ProblemParams problemParams);
         Task<User> GetUser(int id);
         Task<Photo> GetMainPhotoForUser(int userId);
         Task<ProblemPhoto> GetMainPhotoForProblem(int problemId);
         Task<Photo> GetPhoto(int id);
        Task<ProblemPhoto> GetProblemPhoto(int id);
    }
}