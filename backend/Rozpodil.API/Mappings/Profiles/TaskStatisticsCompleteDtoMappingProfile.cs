using AutoMapper;
using Rozpodil.API.Dtos.Responses.TaskStatistics.TaskStatisticsComplete;
using Rozpodil.Domain.ValueObjects.TaskStatisticsComplete;

namespace Rozpodil.API.Mappings.Profiles
{
    public class TaskStatisticsCompleteDtoMappingProfile: Profile
    {
        public TaskStatisticsCompleteDtoMappingProfile()
        {
            CreateMap<TaskStatisticsComplete, TaskStatisticsCompleteDto>();
        }
    }
}
