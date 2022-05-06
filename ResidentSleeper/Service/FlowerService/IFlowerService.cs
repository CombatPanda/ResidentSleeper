using ResidentSleeper.Models;
using System.Collections.Generic;

namespace ResidentSleeper.Service.FlowerService
{
    public interface IFlowerService
    {
        Flower GetById(int id);
        List<Flower> GetAll();
        List<Flower> GetByName(string name);
        List<Flower> GetByType(int typeId);
        int Add(Flower flower);
        int Edit(Flower oldFlower, Flower newFlower);
        int Delete(Flower id);
        int SellFlower(int id, int amount);
    }
}
