﻿namespace Rozpodil.API.Dtos.Requests.Auth
{
    public class RegisterUserRequest
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
