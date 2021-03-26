using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;
using AutoMapper;

namespace Application.Defects
{
    public class List
    {
        public class Query : IRequest<Result<List<DefectDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<DefectDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<DefectDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var defects = await _context.Defects
                    .Include(w => w.Workers)
                    .ThenInclude(u => u.AppUser)
                    .ToListAsync();
                
                var defectsToReturn = _mapper.Map<List<DefectDto>>(defects);

                return Result<List<DefectDto>>.Success(defectsToReturn);
            }
        }
    }
}