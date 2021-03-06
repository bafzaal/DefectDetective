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

        [HttpPost]
        public async Task<IActionResult> CreateDefect(Defect defect)
        {
            return Ok(await Mediator.Send(new Create.Command{Defect = defect}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditDefect(Guid id, Defect defect)
        {
            defect.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Defect = defect}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDefect(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}