using System.Collections.Generic;
using System.Threading.Tasks;
using Shedule.API.Models;

namespace Shedule.API.Data
{
    public interface IDatingRepository 
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
    }
}