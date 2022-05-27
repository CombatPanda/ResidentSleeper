using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResidentSleeper.Models
{
    public class OrderDetail
    {
        public int ID { get; set; }
        public int flowerID { get; set; }
        public string pictureUrl { get; set; }
        public string name { get; set; }
        public int cost { get; set; }
        public int quantity { get; set; }
        public int orderID { get; set; }
    }
}
