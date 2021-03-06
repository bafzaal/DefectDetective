using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var defect = await _context.Defects.FindAsync(request.Defect.Id);

                _mapper.Map(request.Defect, defect);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}