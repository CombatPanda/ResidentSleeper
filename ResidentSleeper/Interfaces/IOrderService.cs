using ResidentSleeper.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ResidentSleeper.Interfaces
{
    public interface IOrderService
    {
        Task<OrderWithDetails> GetById(int id);
        Task<List<OrderWithDetails>> GetAll();
        Task<List<OrderWithDetails>> GetByUserId(int id);
        Task Create(OrderWithDetails orderWithDetails);
        Task Update(int id, OrderWithDetails orderWithDetails);
        Task Delete(int id);
    }
}
