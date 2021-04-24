using System;
using System.Text.Json.Serialization;

namespace Application.Profiles
{
    public class UserDefectDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public bool isClosed { get; set; }
        
        [JsonIgnore]
        public string OwnerUsername { get; set; }
    }
}