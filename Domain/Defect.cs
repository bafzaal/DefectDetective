using System;
using System.Collections.Generic;

namespace Domain
{
    public class Defect
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }
        public ICollection<DefectWorker> Workers { get; set; }
    }
}