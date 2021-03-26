using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Defects
{
    public class UpdateWorkers
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var defect = await _context.Defects
                    .Include(w => w.Workers).ThenInclude(u => u.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if(defect == null)
                {
                    return null;
                }

                var user = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if(user == null)
                {
                    return null;
                }

                var ownerUsername = defect.Workers.FirstOrDefault(x => x.IsOwner)?.AppUser?.UserName;

                var workers = defect.Workers.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if(workers != null && ownerUsername == user.UserName)
                {
                    defect.isClosed = !defect.isClosed;
                }

                if(workers != null && ownerUsername != user.UserName)
                {
                    defect.Workers.Remove(workers);
                }

                if(workers == null)
                {
                    workers = new DefectWorker
                    {
                        AppUser = user,
                        Defect = defect,
                        IsOwner = false
                    };

                    defect.Workers.Add(workers);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating workers");
            }
        }
    }
}