using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ResidentSleeper.Models;
using ResidentSleeper.Services.UserService;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ResidentSleeper.Services.JWTService
{
    public class JWTService : IJWTService
    {
        private IConfiguration _config;
        private readonly IUserService _userService;
        public static JwtSecurityToken token = null;

        public JWTService(IConfiguration config, IUserService userService)
        {
            _config = config;
            _userService = userService;
        }

        public string GenerateJSONWebToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
            new Claim(JwtRegisteredClaimNames.Sub, user.ID.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
             };

            token = new JwtSecurityToken(_config["Jwt:Issuer"],
            _config["Jwt:Issuer"],
            claims,
            expires: DateTime.Now.AddMinutes(120),
            signingCredentials: credentials);



            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<User> AuthenticateUserAsync(User login)
        {
            User user = null;

            User foundUser = await _userService.CheckUser(login);
            if (foundUser != null)
            {
                if (login.Password == foundUser.Password && login.Email == foundUser.Email)
                {
                    user = new User { ID = foundUser.ID, Username = foundUser.Username, Email = foundUser.Email };

                }
                return user;
            }
            else
            {
                return user;
            }
        }
        public string GetID()
        {
            if (token == null) return null;

            var temp = token.Claims.FirstOrDefault(claim => claim.Type == "sub").Value;
            if (temp == null)
                return null;
            else
                return token.Claims.FirstOrDefault(claim => claim.Type == "sub").Value;

        }
        public string GetUsername()
        {
            return token.Claims.First(claim => claim.Type == "unique_name").Value;

        }
    }
}
