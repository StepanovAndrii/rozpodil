using Rozpodil.Application.Common;
using Rozpodil.Application.Interfaces.Repositories;
using Rozpodil.Application.Interfaces.Services;
using Rozpodil.Application.Models;

namespace Rozpodil.Application.Services.Validation
{
    public class EmailValidationService: IEmailValidationService
    {
        private readonly IUnitOfWork _unitOfWork;
        public EmailValidationService(
                IUnitOfWork unitOfWork
            )
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<EmailTakenModel, ErrorType>> IsEmailTakenAsync(string email)
        {
            bool emailTaken = await _unitOfWork.UserCredentialsRepository.IsEmailTakenAsync(email);
            return Result<EmailTakenModel, ErrorType>.Ok(
                new EmailTakenModel { Taken = emailTaken }  
            );
        }
    }
}
