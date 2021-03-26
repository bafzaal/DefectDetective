using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Defects
{
    public class DefectDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }
        public string OwnerUsername { get; set; }
        public bool isClosed { get; set; }
        public ICollection<Profile> Workers { get; set; }
    }
}