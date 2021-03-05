using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Defects;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class DefectsController : BaseApiController
    {
        private readonly IMediator _mediator;
        public DefectsController(IMediator mediator)
        {
            _mediator = mediator;

        }

        [HttpGet]
        public async Task<ActionResult<List<Defect>>> GetDefects()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //  activities/id
        public async Task<ActionResult<Defect>> GetDefect(Guid id)
        {
            return Ok();
        }
    }
}