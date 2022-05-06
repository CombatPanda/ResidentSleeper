using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResidentSleeper.Models
{
    public class Order
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public int Status { get; set; }
        public double Cost { get; set; }
    }
}
