using System.Collections.Generic;

namespace ResidentSleeper.Models
{
    public class OrderWithDetails
    {
        public Order Order { get; set; }
        public List<OrderDetail> Details { get; set; }
    }
}
