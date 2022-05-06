using ResidentSleeper.Contexts;
using ResidentSleeper.Models;
using System.Collections.Generic;
using System.Linq;
using static ResidentSleeper.Constants.Constants;

namespace ResidentSleeper.Service.FlowerService
{
    public class FlowerService : IFlowerService
    {
        private readonly MainContext _context;

        public FlowerService(MainContext context)
        {
            _context = context;
        }

        public List<Flower> GetAll()
        {
            using (_context)
            {
                return _context.Flowers.ToList();
            }
        }

        public Flower GetById(int id)
        {
            return _context.Flowers.FirstOrDefault(f => f.ID == id);
        }

        public List<Flower> GetByType(int typeId)
        {
            return _context.Flowers.Where(f => f.flowerType == (FlowerType)typeId).ToList();
        }

        public List<Flower> GetByName(string name)
        {
            return _context.Flowers.Where(f => f.name.Contains(name)).ToList();
        }

        public int Add(Flower flower)
        {
            _context.Flowers.Add(flower);
            return _context.SaveChanges();
        }

        public int Delete(Flower flower)
        {
            _context.Flowers.Remove(flower);
            return _context.SaveChanges();
        }

        public int Edit(Flower oldFlower, Flower newFlower)
        {
            oldFlower.description = newFlower.description;
            oldFlower.cost = newFlower.cost;
            oldFlower.count = newFlower.count;
            oldFlower.flowerType = newFlower.flowerType;
            oldFlower.name = newFlower.name;

            return _context.SaveChanges();
        }

        public int SellFlower(int id, int amount)
        {
            _context.Flowers.FirstOrDefault(f => f.ID == id).count -= amount;
            return _context.SaveChanges();
        }
    }
}
