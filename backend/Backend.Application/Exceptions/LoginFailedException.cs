using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.Exceptions
{
    public class LoginFailedException(string email): Exception($"Invalid email: {email} or password");
}
