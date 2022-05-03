using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResidentSleeper.Models
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public int flowerId { get; set; }
        public int quantity { get; set; }
        public int orderId { get; set; }
    }
}
