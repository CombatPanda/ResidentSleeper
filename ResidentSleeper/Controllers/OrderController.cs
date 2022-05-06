using Microsoft.AspNetCore.Mvc;
using ResidentSleeper.Contexts;
using ResidentSleeper.Models;
using ResidentSleeper.Services.OrderService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResidentSleeper.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _service;

        public OrderController(IOrderService service)
        {
            _service = service;
        }

        // GET: /order
        [HttpGet]
        public async Task<List<OrderWithDetails>> GetAll()
        {
            return await _service.GetAll();
        }

        // GET: /order/userid/1
        [HttpGet("userid/{userId}")]
        public async Task<List<OrderWithDetails>> GetByUserId(int userId)
        {
            return await _service.GetByUserId(userId);
        }

        // GET: /order/id/1
        [HttpGet("id/{id}")]
        public async Task<OrderWithDetails> GetById(int id)
        {
            return await _service.GetById(id);
        }

        // POST: /order
        [HttpPost]
        public async Task Create(OrderWithDetails orderWithDetails)
        {
            await _service.Create(orderWithDetails);
        }

       /* // PUT: /order/1
        [HttpPut("{id}")]
        public async Task Update(int id, OrderWithDetails orderWithDetails)
        {
            await _service.Update(id, orderWithDetails);
        }*/

        // DELETE: /order/1
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.Delete(id);
        }
        // DELETE: /order/test
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
        }
    }
}
