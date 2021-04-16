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
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }

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

            builder.Entity<Comment>()
                .HasOne(d => d.Defect)
                .WithMany(c => c.Comments)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserFollowing>(b => 
            {
                b.HasKey(k => new {k.ObserverId, k.TargetId});

                b.HasOne(o => o.Observer)
                    .WithMany(f => f.Followings)
                    .HasForeignKey(o => o.ObserverId)
                    .OnDelete(DeleteBehavior.Cascade);

                b.HasOne(o => o.Target)
                    .WithMany(f => f.Followers)
                    .HasForeignKey(t => t.TargetId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}