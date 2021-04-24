using System;
using Application.Core;

namespace Application.Defects
{
    public class DefectParams : PagingParams
    {
        public bool IsWorking { get; set; }
        public bool IsOwner { get; set; }
        public bool isClosed { get; set; }
        public DateTime StartDate { get; set; }
    }
}