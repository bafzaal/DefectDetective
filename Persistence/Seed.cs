using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Defects.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var defects = new List<Defect>
                {
                    new Defect
                    {
                        Title = "Past Defect 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Defect 2 months ago",
                        Category = "Frontend",
                        Priority = "High",
                        Status = "Open",
                        Workers = new List<DefectWorker>
                        {
                            new DefectWorker
                            {
                                AppUser = users[0],
                                IsOwner = true
                            }
                        }
                    },
                    new Defect
                    {
                        Title = "Past Defect 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Defect 1 month ago",
                        Category = "Backend",
                        Priority = "Low",
                        Status = "In Progress",
                        Workers = new List<DefectWorker>
                        {
                            new DefectWorker
                            {
                                AppUser = users[0],
                                IsOwner = true
                            },
                            new DefectWorker
                            {
                                AppUser = users[1],
                                IsOwner = false
                            },
                        }
                    },
                    new Defect
                    {
                        Title = "Future Defect 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Defect 1 month in future",
                        Category = "Testing",
                        Priority = "Medium",
                        Status = "Open",
                        Workers = new List<DefectWorker>
                        {
                            new DefectWorker
                            {
                                AppUser = users[2],
                                IsOwner = true
                            },
                            new DefectWorker
                            {
                                AppUser = users[1],
                                IsOwner = false
                            },
                        }
                    },
                    new Defect
                    {
                        Title = "Future Defect 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Defect 2 months in future",
                        Category = "Database",
                        Priority = "Low",
                        Status = "Closed",
                        Workers = new List<DefectWorker>
                        {
                            new DefectWorker
                            {
                                AppUser = users[0],
                                IsOwner = true
                            },
                            new DefectWorker
                            {
                                AppUser = users[2],
                                IsOwner = false
                            },
                        }
                    },
                    new Defect
                    {
                        Title = "Future Defect 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Defect 3 months in future",
                        Category = "Design",
                        Priority = "High",
                        Status = "In Progress",
                        Workers = new List<DefectWorker>
                        {
                            new DefectWorker
                            {
                                AppUser = users[1],
                                IsOwner = true
                            },
                            new DefectWorker
                            {
                                AppUser = users[0],
                                IsOwner = false
                            },
                        }
                    },
                    new Defect
                    {
                        Title = "Future Defect 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Defect 4 months in future",
                        Category = "Deployment",
                        Priority = "Medium",
                        Status = "Open",
                        Workers = new List<DefectWorker>
                        {
                            new DefectWorker
                            {
                                AppUser = users[1],
                                IsOwner = true
                            }
                        }
                    },
                    new Defect
                    {
                        Title = "Future Defect 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Defect 5 months in future",
                        Category = "Testing",
                        Priority = "High",
                        Status = "Closed",
                        Workers = new List<DefectWorker>
                        {
                            new DefectWorker
                            {
                                AppUser = users[0],
                                IsOwner = true
                            },
                            new DefectWorker
                            {
                                AppUser = users[1],
                                IsOwner = false
                            },
                        }
                    },
                    new Defect
                    {
                        Title = "Future Defect 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Defect 6 months in future",
                        Category = "Frontend",
                        Priority = "Low",
                        Status = "In Progress",
                        Workers = new List<DefectWorker>
                        {
                            new DefectWorker
                            {
                                AppUser = users[2],
                                IsOwner = true
                            },
                            new DefectWorker
                            {
                                AppUser = users[1],
                                IsOwner = false
                            },
                        }
                    },
                    new Defect
                    {
                        Title = "Future Defect 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Defect 7 months in future",
                        Category = "Design",
                        Priority = "High",
                        Status = "Low",
                        Workers = new List<DefectWorker>
                        {
                            new DefectWorker
                            {
                                AppUser = users[0],
                                IsOwner = true
                            },
                            new DefectWorker
                            {
                                AppUser = users[2],
                                IsOwner = false
                            },
                        }
                    },
                    new Defect
                    {
                        Title = "Future Defect 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Defect 8 months in future",
                        Category = "Deployment",
                        Priority = "Medium",
                        Status = "In Progress",
                        Workers = new List<DefectWorker>
                        {
                            new DefectWorker
                            {
                                AppUser = users[2],
                                IsOwner = true
                            },
                            new DefectWorker
                            {
                                AppUser = users[1],
                                IsOwner = false
                            },
                        }
                    }
                };

                await context.Defects.AddRangeAsync(defects);
                await context.SaveChangesAsync();
            }
        }
    }
}