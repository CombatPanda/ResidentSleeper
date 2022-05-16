using ResidentSleeper.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ResidentSleeper.Services.UserService
{
    public interface IUserService
    {
        Task<ServiceResponse<List<User>>> AddUser(User newUser);
        Task<User> CheckUser(User newUser);
        Task<ServiceResponse<List<User>>> GetAllUsers();
        Task<ServiceResponse<User>> GetCurrentUser(int userID);
    }
}
