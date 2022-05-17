using ResidentSleeper.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ResidentSleeper.Services.OrderService
{
    public interface IOrderService
    {
        Task<OrderWithDetails> GetById(int id);
        Task<List<OrderWithDetails>> GetAll();
        Task<List<OrderWithDetails>> GetByUserId(int id);
        Task Create(OrderWithDetails orderWithDetails);
        Task<int> CreateEmptyOrderReturnId(int userId);
        Task AddDetailsByOrderId(int id, OrderDetail newDetail);
        //Task Update(int id, OrderWithDetails orderWithDetails);
        Task Delete(int id);
    }
}
