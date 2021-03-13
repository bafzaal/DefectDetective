using Domain;
using FluentValidation;

namespace Application.Defects
{
    public class DefectValidator : AbstractValidator<Defect>
    {
        public DefectValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.Priority).NotEmpty();
            RuleFor(x => x.Status).NotEmpty();
        }
    }
}