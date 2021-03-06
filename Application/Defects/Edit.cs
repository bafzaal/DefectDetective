using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Defects
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Defect Defect { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var defect = await _context.Defects.FindAsync(request.Defect.Id);

                defect.Title = request.Defect.Title ?? defect.Title;

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}