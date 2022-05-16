using Microsoft.AspNetCore.Mvc;
using ResidentSleeper.Models;
using ResidentSleeper.Services.JWTService;
using ResidentSleeper.Services.UserService;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ResidentSleeper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IJWTService _jWTService;

        public UserController(IUserService userService, IJWTService jWTService)
        {
            _userService = userService;
            _jWTService = jWTService;
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<User>> PostUserInformation(User user)
        {
            var check = await _userService.AddUser(user);
            if (check.Success)
            {
                return Ok(await _userService.AddUser(user));
            }
            else
            {
                return BadRequest();
            }
        }

        // GET: api/User
        /* [HttpGet]
         public async Task<ActionResult<IEnumerable<User>>> Get()
         {
             return Ok(await _userService.GetAllUsers());
         }*/

        // GET: api/User
        [HttpGet("{id}")]
        //[Route("getCurrent")]
        public async Task<ActionResult<IEnumerable<User>>> GetCurrentUser(int id)
        {

            var check = await _userService.GetCurrentUser(Int32.Parse(_jWTService.GetID()));
            if (check.Success)
            {
                return Ok(await _userService.GetCurrentUser(Int32.Parse(_jWTService.GetID())));
            }
            else
            {
                return BadRequest();
            }

            
        }
    }
}

