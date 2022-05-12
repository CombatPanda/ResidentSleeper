using Microsoft.EntityFrameworkCore;
using ResidentSleeper.Contexts;
using ResidentSleeper.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResidentSleeper.Services.UserService
{
    public class UserService : IUserService
    {
        public static User user;
        private readonly MainContext _context;

        public UserService(MainContext context)
        {
            _context = context;
        }
        public async Task<ServiceResponse<List<User>>> AddUser(User newUser)
        {
            ServiceResponse<List<User>> serviceResponse = new ServiceResponse<List<User>>();

            if (UsernameExists(newUser.Username) || EmailExists(newUser.Email))
            {
                serviceResponse.Success = false;
                return serviceResponse;

            }
            else
            {
                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();

                Order order = new Order();
                order.UserID = newUser.ID;
                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                serviceResponse.Data = await _context.Users.ToListAsync();
                return serviceResponse;
            }

        }

        public async Task<User> CheckUser(User newUser)
        {
            return _context.Users.Where(e => e.Email == newUser.Email && e.Password == newUser.Password).FirstOrDefault();
        }



        private bool UsernameExists(string username)
        {
            return _context.Users.Any(e => e.Username == username);
        }

        private bool EmailExists(string email)
        {
            return _context.Users.Any(e => e.Email == email);
        }

        public async Task<ServiceResponse<List<User>>> GetAllUsers()
        {
            ServiceResponse<List<User>> serviceResponse = new ServiceResponse<List<User>>();
            serviceResponse.Data = await _context.Users.ToListAsync();
            return serviceResponse;
        }
    }
}
