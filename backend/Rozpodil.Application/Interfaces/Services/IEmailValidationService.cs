using Rozpodil.Application.Common;
using Rozpodil.Application.Models;

namespace Rozpodil.Application.Interfaces.Services
{
    public interface IEmailValidationService
    {
        Task<Result<EmailTakenModel, ErrorType>> IsEmailTakenAsync(string email);
    }
}
