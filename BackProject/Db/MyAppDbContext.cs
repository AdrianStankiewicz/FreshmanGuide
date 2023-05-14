using BackProject.Models;
using Microsoft.EntityFrameworkCore;


namespace BackProject.Db
{
    public class MyAppDbContext : DbContext
    {
        public MyAppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Admin> Admin { get; set; }
        public DbSet<Canteen> Canteen { get; set; }
        public DbSet<Category> Category{ get; set; }
        public DbSet<Consultations> Consultation { get; set; }
        public DbSet<Dictionary> Dictionary { get; set; }
        public DbSet<Internship> Practice { get; set; }
        public DbSet<Post> Post { get; set; }
        public DbSet<Professor> Professor { get; set; }
        public DbSet<Reply> Reply { get; set; }
        public DbSet<Shop> Shop { get; set; }
    }
}
