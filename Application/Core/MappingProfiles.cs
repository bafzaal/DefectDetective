using System.Linq;
using Application.Defects;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Defect, Defect>();
            CreateMap<Defect, DefectDto>()
                .ForMember(d => d.OwnerUsername, o => o.MapFrom(s => s.Workers
                    .FirstOrDefault(x => x.IsOwner).AppUser.UserName));
            CreateMap<DefectWorker, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}