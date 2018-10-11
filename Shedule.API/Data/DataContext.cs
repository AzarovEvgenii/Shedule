using Microsoft.EntityFrameworkCore;
using Shedule.API.Models;

namespace Shedule.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Value> Values { get; set; }
    }
}