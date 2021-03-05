using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Defects;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DefectsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Defect>>> GetDefects()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //  activities/id
        public async Task<ActionResult<Defect>> GetDefect(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }
    }
}