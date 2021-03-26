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
            CreateMap<Defect, DefectDto>();
        }
    }
}