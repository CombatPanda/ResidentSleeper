﻿using Microsoft.AspNetCore.Mvc;
using ResidentSleeper.Models;
using ResidentSleeper.Services.UserService;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ResidentSleeper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return Ok(await _userService.GetAllUsers());
        }
    }
}

