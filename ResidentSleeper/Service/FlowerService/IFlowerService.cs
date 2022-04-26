using ResidentSleeper.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ResidentSleeper.Service.FlowerService
{
    public interface IFlowerService
    {
        Task<Flower> GetById(int id);
        Task<List<Flower>> GetAll();
        Task<List<Flower>> GetByName(string name);
        Task<List<Flower>> GetByType(int typeId);
        Task Add(Flower flower);
        Task Edit(int id, Flower flower);
        Task Delete(int id);
        Task SellFlower(int id, int amount);
    }
}
