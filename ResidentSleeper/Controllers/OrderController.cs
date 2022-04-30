using Microsoft.AspNetCore.Mvc;
using ResidentSleeper.Contexts;
using ResidentSleeper.Models;
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
        private readonly MainContext _context;

        public OrderController(MainContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<OrderWithDetails>> GetAllOrders()
        {
            var or = new Order();
            or.ID = 1;
            or.userID = "1";

            var orDet = new OrderDetail();
            orDet.ID = 2;


            List<OrderWithDetails> fullOrders = new List<OrderWithDetails>()
            {
                new OrderWithDetails(){
                    Order = or,
                    Details = new List<OrderDetail>(){orDet, orDet}
                },
                new OrderWithDetails(){
                    Order = or,
                    Details = new List<OrderDetail>(){orDet}
                },
            };
            return fullOrders;
        }


        [HttpGet("{id}")]
        public ActionResult<OrderWithDetails> Get(string id)
        {
            var or = new Order();
            or.ID = 1;
            or.userID = "1";

            var orDet = new OrderDetail();
            orDet.ID = 2;

            var order = new OrderWithDetails()
            {
                Order = or,
                Details = new List<OrderDetail>() { orDet, orDet }
            };
            return order;
        }


        [HttpPost]
        public ActionResult<OrderWithDetails> AddOrder([FromBody] OrderWithDetails obj)
        {
            return obj;
        }


        /*[HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] Customer obj)
        {
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
        }*/
    }
}
