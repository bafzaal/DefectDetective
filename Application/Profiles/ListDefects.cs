using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListDefects
    {
        public class Query : IRequest<Result<List<UserDefectDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<UserDefectDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<List<UserDefectDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.DefectWorkers
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(d => d.Defect.Date)
                    .ProjectTo<UserDefectDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();
                query = request.Predicate switch
                {
                    "closed" => query.Where(a => a.isClosed == true),
                    "open" => query.Where(a => a.isClosed == false),
                    "owner" => query.Where(d => d.OwnerUsername == request.Username),
                    _ => query.Where(a => a.isClosed == false)
                };

                var defects = await query.ToListAsync();
                return Result<List<UserDefectDto>>.Success(defects);
            }
        }
        }
    }