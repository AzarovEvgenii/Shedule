using System.Linq;
using AutoMapper;
using Shedule.API.Dtos;
using Shedule.API.Models;

namespace Shedule.API.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<Problem, ProblemForListDto>()
            .ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            });
            CreateMap<Problem, ProblemForDetailedDto>()
            .ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            });  
            CreateMap<Photo, PhotoForDetailedDto>();
            CreateMap<ProblemPhoto, ProblemPhotoForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<ProblemForUpdateDto, Problem>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<ProblemPhoto, ProblemPhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<ProblemForCreationDto, Problem>();
            CreateMap<ProblemPhotoForCreationDto, ProblemPhoto>();
            CreateMap<UserForRegisterDto, User>();
        }
    }
}