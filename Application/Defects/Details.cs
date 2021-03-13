using MediatR;
using Domain;
using System;
using System.Threading.Tasks;
using System.Threading;
using Persistence;
using Application.Core;

namespace Application.Defects
{
    public class Details
    {
        public class Query : IRequest<Result<Defect>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Defect>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Defect>> Handle(Query request, CancellationToken cancellationToken)
            {
                var defect = await _context.Defects.FindAsync(request.Id);

                return Result<Defect>.Success(defect);
            }
        }
    }
}