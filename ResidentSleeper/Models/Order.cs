using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResidentSleeper.Models
{
    public class Order
    {
        public int ID { get; set; }
        public string userID { get; set; }
        public int orderDetailID { get; set; }
        public int status { get; set; }
        public double cost { get; set; }
    }
}
