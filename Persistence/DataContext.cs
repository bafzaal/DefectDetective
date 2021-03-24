using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Defect> Defects { get; set; }
        public DbSet<DefectWorker> DefectWorkers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<DefectWorker>(x => x.HasKey(aa => new { aa.AppUserId, aa.DefectId }));

            builder.Entity<DefectWorker>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Defects)
                .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<DefectWorker>()
                .HasOne(u => u.Defect)
                .WithMany(a => a.Workers)
                .HasForeignKey(aa => aa.DefectId);
        }
    }
}