using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Defects.Any()) return;
            
            var activities = new List<Defect>
            {
                new Defect
                {
                    Title = "Past Defect 1",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Defect 2 months ago",
                    Category = "UI",
                    Priority = "High",
                    Status = "Open",
                },
                new Defect
                {
                    Title = "Past Defect 2",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Defect 1 month ago",
                    Category = "Testing",
                    Priority = "Low",
                    Status = "Closed",
                },
                new Defect
                {
                    Title = "Future Defect 1",
                    Date = DateTime.Now.AddMonths(1),
                    Description = "Defect 1 month in future",
                    Category = "UI",
                    Priority = "Medium",
                    Status = "In Progress",
                },
                new Defect
                {
                    Title = "Future Defect 2",
                    Date = DateTime.Now.AddMonths(2),
                    Description = "Defect 2 months in future",
                    Category = "Frontend",
                    Priority = "High",
                    Status = "In Progress",
                },
                new Defect
                {
                    Title = "Future Defect 3",
                    Date = DateTime.Now.AddMonths(3),
                    Description = "Defect 3 months in future",
                    Category = "Full Stack",
                    Priority = "Medium",
                    Status = "Open",
                },
                new Defect
                {
                    Title = "Future Defect 4",
                    Date = DateTime.Now.AddMonths(4),
                    Description = "Defect 4 months in future",
                    Category = "Testing",
                    Priority = "Low",
                    Status = "Closed",
                },
                new Defect
                {
                    Title = "Future Defect 5",
                    Date = DateTime.Now.AddMonths(5),
                    Description = "Defect 5 months in future",
                    Category = "Backend",
                    Priority = "High",
                    Status = "In Progress",
                },
                new Defect
                {
                    Title = "Future Defect 6",
                    Date = DateTime.Now.AddMonths(6),
                    Description = "Defect 6 months in future",
                    Category = "Full Stack",
                    Priority = "Medium",
                    Status = "Open",
                },
                new Defect
                {
                    Title = "Future Defect 7",
                    Date = DateTime.Now.AddMonths(7),
                    Description = "Defect 2 months ago",
                    Category = "Frontend",
                    Priority = "High",
                    Status = "Open",
                },
                new Defect
                {
                    Title = "Future Defect 8",
                    Date = DateTime.Now.AddMonths(8),
                    Description = "Defect 8 months in future",
                    Category = "Backend",
                    Priority = "Medium",
                    Status = "Closed",
                }
            };

            await context.Defects.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}