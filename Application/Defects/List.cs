using System.Collections.Generic;
using MediatR;
using Domain;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Defects
{
    public class List
    {
        public class Query : IRequest<List<Defect>> { }

        public class Handler : IRequestHandler<Query, List<Defect>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Defect>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Defects.ToListAsync();
            }
        }
    }
}