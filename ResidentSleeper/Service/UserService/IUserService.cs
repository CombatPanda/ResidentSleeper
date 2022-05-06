using ResidentSleeper.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResidentSleeper.Service.UserService
{
    public interface IUserService
    {

        Task<ServiceResponse<List<User>>> AddUser(User newUser);
        Task<User> CheckUser(User newUser);

        Task<ServiceResponse<List<User>>> GetAllUsers();
    }
}
