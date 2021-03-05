using MediatR;
using Domain;
using System;
using System.Threading.Tasks;
using System.Threading;
using Persistence;

namespace Application.Defects
{
    public class Details
    {
        public class Query : IRequest<Defect>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Defect>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Defect> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Defects.FindAsync(request.Id);
            }
        }
    }
}