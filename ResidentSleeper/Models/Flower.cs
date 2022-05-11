using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResidentSleeper.Models
{
    public class Flower
    {
        public int ID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int flowerType { get; set; }
        public int count { get; set; }
        public double cost { get; set; }

        public string PictureURL { get; set; } 
    }
}
