using Microsoft.EntityFrameworkCore;
using ResidentSleeper.Contexts;
using ResidentSleeper.Models;
using ResidentSleeper.Services.JWTService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResidentSleeper.Services.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly MainContext _context;
        private readonly IJWTService service;

        public OrderService(MainContext context, IJWTService service)
        {
            _context = context;
            this.service = service;
        }

        public void SaveContextChanges()
        {
            _context.SaveChanges();
        }

        public async Task AddDetailsByOrderId (int id, OrderDetail newDetail)
        {
            var order = _context.Orders.FirstOrDefault(x => x.ID == id);
            if (order == null) return;

            newDetail.orderID = order.ID;
            _context.OrderDetails.Add(newDetail);
            _context.SaveChanges();
        }

        public async Task Create(OrderWithDetails order)
        {
            try
            {
                _context.Orders.Add(order.Order);
                
                await _context.SaveChangesAsync();

                foreach (var o in order.Details)
                {
                    o.orderID = order.Order.ID;
                }
                _context.OrderDetails.AddRange(order.Details);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                //error
            }
        }

        public async Task<int> CreateEmptyOrderReturnId(int userId)
        {
            var order = new Order();
            order.UserID = userId;
            order.Status = 0;
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return order.ID;
        }

        public async Task Delete(int id)
        {
            try
            {
                var order = _context.Orders.FirstOrDefault(x => x.ID == id);
                if (order == null) return;

                var details = await _context.OrderDetails.Where(x => x.orderID == order.ID).ToListAsync();
                _context.OrderDetails.RemoveRange(details);
                _context.Orders.Remove(order);

                await _context.SaveChangesAsync();
            }
            catch(Exception)
            {
                //error
            }
        }

        public async Task<List<OrderWithDetails>> GetAll()
        {
            var ordersWithDetailsList = new List<OrderWithDetails>();
            try
            {
                var orders = await _context.Orders.ToListAsync();
                var details = await _context.OrderDetails.ToListAsync();

                orders.ForEach(o => ordersWithDetailsList.Add(new OrderWithDetails()
                {
                    Order = o,
                    Details = details.Where(d => d.orderID == o.ID).ToList()
                }));
            }
            catch(Exception)
            {
                //error
            }
            return ordersWithDetailsList;
        }

        public async Task<OrderWithDetails> GetById(int id)
        {
            var order = _context.Orders.FirstOrDefault(x => x.ID == id);
            if (order == null) return new OrderWithDetails()
                {
                    Details = new List<OrderDetail>(),
                    Order = new Order()
                };

            var details = await _context.OrderDetails.Where(x => x.orderID == order.ID).ToListAsync();


            return new OrderWithDetails()
            {
                Order = order,
                Details = details
            };
        }

        public async Task<List<OrderWithDetails>> GetByUserId(int id)
        {
            var ordersWithDetailsList = new List<OrderWithDetails>();
            try
            {
                var orders = await _context.Orders.Where(o => o.UserID == id).ToListAsync();
                var details = await _context.OrderDetails.ToListAsync();

                orders.ForEach(o => ordersWithDetailsList.Add(new OrderWithDetails()
                {
                    Order = o,
                    Details = details.Where(d => d.orderID == o.ID).ToList()
                }));
            }
            catch (Exception)
            {
                //error
            }
            return ordersWithDetailsList;
        }
        private int UserID()
        {
            int userID;
            bool convertable = Int32.TryParse(service.GetID(), out userID);
            if (convertable)
                return userID;
            else throw new Exception("Invalid user id");
        }

        /*public async Task Update(int id, OrderWithDetails orderWithDetails)
        {
            try
            {
                var order = orderWithDetails.Order;
                var details = orderWithDetails.Details;

                var oldOrder = _context.Orders.FirstOrDefault(o => o.ID == order.ID);
                if (oldOrder == null) return;

                var oldDetailsList = await _context.OrderDetails.Where(d => d.orderID == order.ID).ToListAsync();
                oldOrder.ID = order.ID;
                oldOrder.UserID = order.UserID;
                oldOrder.Status = order.Status;
                oldOrder.Cost = order.Cost;

                foreach (var det in details)
                {
                    if (!oldDetailsList.Contains(det))
                    {
                        oldDetailsList.Add(det);
                    }
                }
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                //error
            }
        }*/
    }
}
