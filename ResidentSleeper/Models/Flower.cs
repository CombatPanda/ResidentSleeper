using static ResidentSleeper.Constants.Constants;

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
        public string pictureURL { get; set; }
    }
}