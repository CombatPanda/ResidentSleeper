using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResidentSleeper.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Status { get; set; }
        public double Cost { get; set; }
    }
}
