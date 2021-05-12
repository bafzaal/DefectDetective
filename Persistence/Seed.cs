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
                        Email = "bob@test.com",
                        Photos = new List<Photo>
                        {
                            new Photo
                            {
                                Id = "BobDefectDetective_lzouil",
                                Url = "https://res.cloudinary.com/ilsmg0722/image/upload/v1619763895/BobDefectDetective_lzouil.jpg",
                                IsMain = true
                            }
                        }
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com",
                        Photos = new List<Photo>
                        {
                            new Photo
                            {
                                Id = "JaneDefectDetective_vzfn8y",
                                Url = "https://res.cloudinary.com/ilsmg0722/image/upload/v1619763895/JaneDefectDetective_vzfn8y.jpg",
                                IsMain = true
                            }
                        }
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com",
                        Photos = new List<Photo>
                        {
                            new Photo
                            {
                                Id = "TomDefectDetective_qxshdy",
                                Url = "https://res.cloudinary.com/ilsmg0722/image/upload/v1619763895/TomDefectDetective_qxshdy.jpg",
                                IsMain = true
                            }
                        }
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
                        Title = "Inconsistent Page Layout Across Devices",
                        Date = DateTime.Now.AddMonths(-5),
                        Description = "Frontend Issue - Opening the application on different sized screens results in GUI issues.",
                        Category = "frontend",
                        Priority = "low",
                        Status = "closed",
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
                        Title = "Application Crashes on SAVE Button Click",
                        Date = DateTime.Now.AddMonths(-4),
                        Description = "Backend Issue - Application crashes on clicking the SAVE button while creating a new the user, hence unable to create a new user in the application.",
                        Category = "backend",
                        Priority = "high",
                        Status = "closed",
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
                        Title = "Test Tools CPU Usage Causes Freezing",
                        Date = DateTime.Now.AddMonths(-3),
                        Description = "Testing Issue - When using the test tools to assess the current state of the application, CPU usage is drastically increased.",
                        Category = "testing",
                        Priority = "medium",
                        Status = "closed",
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
                        Title = "Database Migrations Failed",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Database Issue - Migrations on the latest build of the application were not updated.",
                        Category = "database",
                        Priority = "low",
                        Status = "in progress",
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
                        Title = "String Irregularities Throughout Application",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Design Issue - Strings are inconsistent in various pages of the application. Also, translations for certains strings are not implemented yet.",
                        Category = "design",
                        Priority = "high",
                        Status = "in progress",
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
                        Title = "Security Headers Not Implemented",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Deployment Issue - The following security headers are not implemented: Content-Security-Policy, Referrer-Policy and Strict-Transport-Security.",
                        Category = "deployment",
                        Priority = "medium",
                        Status = "open",
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
                        Title = "Nightly Automated Test Failing",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Testing Issue - Automated tests need to be updated to align with new development.",
                        Category = "testing",
                        Priority = "high",
                        Status = "open",
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
                        Title = "No Confirmation Message Shown on Contact Form",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Frontend Issue - After submitting a contact request, the confirmation modal is not triggered.",
                        Category = "frontend",
                        Priority = "low",
                        Status = "open",
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
                        Title = "Application Compatibility Need Updates",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Design Issue - The application design needs to be updated to efficiently run on the newest hardware and operating systems",
                        Category = "design",
                        Priority = "high",
                        Status = "open",
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
                        Title = "Misconfigured Network Load Balancers",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Deployment Issue - As more and more users load the application, traffic distribution across servers is not optimized and in turn slows down the application.",
                        Category = "deployment",
                        Priority = "medium",
                        Status = "open",
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