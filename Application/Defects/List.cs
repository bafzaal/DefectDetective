using System.Collections.Generic;
using MediatR;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Interfaces;
using System.Linq;

namespace Application.Defects
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<DefectDto>>> 
        {
            public DefectParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<DefectDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<DefectDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Defects
                    .Where(d => d.Date >= request.Params.StartDate)
                    .OrderBy(d => d.Date)
                    .ProjectTo<DefectDto>(_mapper.ConfigurationProvider, new {currentUsername = _userAccessor.GetUsername()})
                    .AsQueryable();

                if(request.Params.IsWorking && !request.Params.IsOwner)
                {
                    query = query.Where(x => x.Workers.Any(a => a.Username == _userAccessor.GetUsername()));
                }

                if(request.Params.IsOwner && !request.Params.IsWorking)
                {
                    query = query.Where(x => x.OwnerUsername == _userAccessor.GetUsername());
                }

                return Result<PagedList<DefectDto>>.Success(
                    await PagedList<DefectDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}