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

namespace Application.Defects
{
    public class List
    {
        public class Query : IRequest<Result<List<DefectDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<DefectDto>>>
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

            public async Task<Result<List<DefectDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var defects = await _context.Defects
                    .ProjectTo<DefectDto>(_mapper.ConfigurationProvider, new {currentUsername = _userAccessor.GetUsername()})
                    .ToListAsync();

                return Result<List<DefectDto>>.Success(defects);
            }
        }
    }
}