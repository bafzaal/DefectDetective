using System.Linq;
using Application.Comments;
using Application.Defects;
using Application.Profiles;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;

            CreateMap<Defect, Defect>();
            CreateMap<Defect, DefectDto>()
                .ForMember(d => d.OwnerUsername, o => o.MapFrom(s => s.Workers
                    .FirstOrDefault(x => x.IsOwner).AppUser.UserName));
            CreateMap<DefectWorker, WorkerDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.AppUser.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.AppUser.Followings.Count))
                .ForMember(d => d.Following, o => o.MapFrom(s => s.AppUser.Followers.Any(x => x.Observer.UserName == currentUsername)));
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
                .ForMember(d => d.Following, o => o.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUsername)));
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<DefectWorker, UserDefectDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Defect.Id))
                .ForMember(d => d.isClosed, o => o.MapFrom(s => s.Defect.isClosed))
                .ForMember(d => d.Title, o => o.MapFrom(s => s.Defect.Title))
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Defect.Category))
                .ForMember(d => d.OwnerUsername, o => o.MapFrom(s => s.Defect.Workers.FirstOrDefault(x => x.IsOwner).AppUser.UserName));
        }
    }
}