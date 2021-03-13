using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Core;

namespace Application.Defects
{
    public class List
    {
        public class Query : IRequest<Result<List<Defect>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Defect>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Defect>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Defect>>.Success(await _context.Defects.ToListAsync());
            }
        }
    }
}