using System;
using System.Threading.Tasks;
using Application.Defects;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DefectsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetDefects()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //  defects/id
        public async Task<IActionResult> GetDefect(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDefect(Defect defect)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Defect = defect}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditDefect(Guid id, Defect defect)
        {
            defect.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Defect = defect}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDefect(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}