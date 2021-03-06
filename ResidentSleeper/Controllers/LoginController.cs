using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ResidentSleeper.Attributes;
using ResidentSleeper.Models;
using ResidentSleeper.Services;
using ResidentSleeper.Services.JWTService;

namespace ResidentSleeper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private readonly IJWTService _JWTService;

        public LoginController(IJWTService jwtService)
        {
            _JWTService = jwtService;
        }

        [Audit]
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody] User login)
        {
            IActionResult response = Unauthorized();
            var user = _JWTService.AuthenticateUserAsync(login);

            if (user.Result != null)
            {
                var tokenString = _JWTService.GenerateJSONWebToken(user.Result);
                response = Ok(new { token = tokenString });
            }

            return response;
        }

    }
}

