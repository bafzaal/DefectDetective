using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class DefectsController : BaseApiController
    {
        private readonly DataContext _context;
        public DefectsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Defect>>> GetDefects()
        {
            return await _context.Defects.ToListAsync();
        }

        [HttpGet("{id}")] //  activities/id
        public async Task<ActionResult<Defect>> GetDefect(Guid id)
        {
            return await _context.Defects.FindAsync(id);
        }
    }
}