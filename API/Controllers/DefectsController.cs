using System;
using System.Threading.Tasks;
using Application.Core;
using Application.Defects;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DefectsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetDefects([FromQuery]PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
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

        [Authorize(Policy = "IsDefectOwner")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditDefect(Guid id, Defect defect)
        {
            defect.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Defect = defect}));
        }

        [Authorize(Policy = "IsDefectOwner")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDefect(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPost("{id}/work")]
        public async Task<IActionResult> Work(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateWorkers.Command{Id = id}));
        }
    }
}