using ResidentSleeper.Models;
using System.Threading.Tasks;

namespace ResidentSleeper.Services.JWTService
{
    public interface IJWTService
    {
        string GenerateJSONWebToken(User user);
        Task<User> AuthenticateUserAsync(User login);
        string GetID();
        string GetUsername();
    }
}
