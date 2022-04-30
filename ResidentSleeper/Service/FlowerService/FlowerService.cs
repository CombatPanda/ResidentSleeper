using Microsoft.EntityFrameworkCore;
using ResidentSleeper.Contexts;
using ResidentSleeper.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResidentSleeper.Service.FlowerService
{
    public class FlowerService : IFlowerService
    {
        private readonly MainContext _context;

        public FlowerService(MainContext context)
        {
            _context = context;

        }
        public async Task Add(Flower flower)
        {
            _context.Flowers.Add(flower);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var flower = _context.Flowers.FirstOrDefault(f => f.ID == id);
            if(flower!= null)
            {
                _context.Flowers.Remove(flower);
                await _context.SaveChangesAsync();
            }
        }

        public async Task Edit(int id, Flower flower)
        {
            var oldFlower = _context.Flowers.FirstOrDefault(f => f.ID == id);
            if(oldFlower != null)
            {
                oldFlower.description = flower.description;
                oldFlower.cost = flower.cost;
                oldFlower.count = flower.count;
                oldFlower.flowerType = flower.flowerType;
                oldFlower.name = flower.name;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Flower>> GetAll()
        {
            var flowers = new List<Flower>();
            using (_context)
            {
                flowers = await _context.Flowers.ToListAsync();
            }
            return flowers;
        }

        public async Task<List<Flower>> GetByType(int typeId)
        {
            var flowers = new List<Flower>();
            using (_context)
            {
                flowers = await _context.Flowers.Where(f => f.flowerType == typeId).ToListAsync();
            }
            return flowers;
        }

        public async Task<Flower> GetById(int id)
        {
            return await _context.Flowers.FirstOrDefaultAsync(f => f.ID == id);
        }

        public async Task<List<Flower>> GetByName(string name)
        {
            var flowers = new List<Flower>();
            using (_context)
            {
                flowers = await _context.Flowers.Where(f => f.name == name).ToListAsync();
            }
            return flowers;
        }

        public async Task SellFlower(int id, int amount)
        {
            _context.Flowers.FirstOrDefault(f => f.ID == id).count -= amount;
            await _context.SaveChangesAsync();
        }
    }
}
