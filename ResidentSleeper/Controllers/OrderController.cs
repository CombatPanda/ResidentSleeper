using Microsoft.AspNetCore.Mvc;
using ResidentSleeper.Attributes;
using ResidentSleeper.Contexts;
using ResidentSleeper.Models;
using ResidentSleeper.Services.FlowerService;
using ResidentSleeper.Services.JWTService;
using ResidentSleeper.Services.OrderService;
using ResidentSleeper.Services.UserService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ResidentSleeper.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _service;
        private readonly IFlowerService _flowerService;
        private readonly IUserService _userService;
        private readonly IJWTService _jWTService;


        public OrderController(IFlowerService flowerService, IOrderService service, IUserService userService, IJWTService jWTService)
        {
            _service = service;
            _userService = userService;
            _jWTService = jWTService;
            _flowerService = flowerService;
        }

        // GET: api/order
        [Audit]
        [HttpGet]
        public async Task<List<OrderWithDetails>> GetAll()
        {
            return await _service.GetAll();
        }

        // GET: api/order/userid/1
        [Audit]
        [HttpGet("userid/{userId}")]
        public async Task<List<OrderWithDetails>> GetByUserId(int userId)
        {
            return await _service.GetByUserId(userId);
        }

        // GET: api/order/id/1
        [Audit]
        [HttpGet("id/{id}")]
        public async Task<OrderWithDetails> GetById(int id)
        {
            return await _service.GetById(id);
        }

        [Audit]
        [HttpPost("AddNewDetail")]
        public async Task AddNewDetail(OrderDetail orderDetail)
        {
            var check = await _userService.GetCurrentUser(Int32.Parse(_jWTService.GetID()));
            if (check.Success)
            {
                var orderId = check.Data.CurrentOrderId;
                if (check.Data.CurrentOrderId == 0)
                {
                    orderId = await _service.CreateEmptyOrderReturnId(check.Data.ID);
                    check.Data.CurrentOrderId = orderId;
                    _service.SaveContextChanges();
                }
                if (_flowerService.GetById(orderDetail.flowerID) != null)
                    await _service.AddDetailsByOrderId(orderId, orderDetail);
            }
        }

        // POST: api/order
        [Audit]
        [HttpPost]
        public async Task Create(OrderWithDetails orderWithDetails)
        {
            await _service.Create(orderWithDetails);
        }

        // POST: api/order/id/1
        [Audit]
        [HttpPut("id/{id}")]
        public async Task AddOrderDetail(int id, OrderDetail orderDetail)
        {
            await _service.AddDetailsByOrderId(id, orderDetail);
        }

        /* // PUT: api/order/1
         [HttpPut("{id}")]
         public async Task Update(int id, OrderWithDetails orderWithDetails)
         {
             await _service.Update(id, orderWithDetails);
         }*/

        // DELETE: api/order/1
        [Audit]
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.Delete(id);
        }
        /*// GET: api/order/test
        [HttpGet("test")]
        public OrderWithDetails test()
        {
            var order = new Order();
            var details = new List<OrderDetail>();
            details.Add(new OrderDetail());
            details.Add(new OrderDetail());

            return new OrderWithDetails()
            {
                Order = order,
                Details = details
            };
        }*/
    }
}
