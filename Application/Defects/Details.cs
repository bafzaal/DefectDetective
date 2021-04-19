using MediatR;
using System;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Application.Interfaces;

namespace Application.Defects
{
    public class Details
    {
        public class Query : IRequest<Result<DefectDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<DefectDto>>
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

            public async Task<Result<DefectDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var defect = await _context.Defects
                    .ProjectTo<DefectDto>(_mapper.ConfigurationProvider, new {currentUser = _userAccessor.GetUsername()})
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<DefectDto>.Success(defect);
            }
        }
    }
}