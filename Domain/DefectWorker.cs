using System;

namespace Domain
{
    public class DefectWorker
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid DefectId { get; set; }
        public Defect Defect { get; set; }
        public bool IsOwner { get; set; }
    }
}