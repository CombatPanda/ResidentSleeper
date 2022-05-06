using ResidentSleeper.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResidentSleeper.Service.JWTService
{
    public interface IJWTService
    {
        string GenerateJSONWebToken(User user);
        Task<User> AuthenticateUserAsync(User login);
        string GetID();
        string GetUsername();
    }
}
