using Microsoft.AspNetCore.Mvc;
using ResidentSleeper.Models;
using ResidentSleeper.Service.FlowerService;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ResidentSleeper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlowerController : ControllerBase
    {
        private readonly IFlowerService _service;

        public FlowerController(IFlowerService service)
        {
            _service = service;
        }

        // GET: api/Flower
        [HttpGet]
        public async Task<List<Flower>> GetAll() 
        {
            return await _service.GetAll(); 
        }

        // GET: api/Flower/id/10
        [HttpGet("id/{id}")]
        public async Task<Flower> GetById(int id)
        {
            return await _service.GetById(id);
        }

        // GET: api/Flower/type/5
        [HttpGet("type/{typeId}")]
        public async Task<List<Flower>> GetByType(int typeId)
        {
            return await _service.GetByType(typeId);
        }

        // GET: api/Flower/name/tulpe
        [HttpGet("name/{typeId}")]
        public async Task<List<Flower>> GetByName(string name)
        {
            return await _service.GetByName(name);
        }

        // POST: api/Flower
        [HttpPost]
        public async Task Add (Flower flower)
        {
            await _service.Add(flower);
        }

        // PUT: api/Flower/10
        [HttpPut("{id}")]
        public async Task Edit(int id, Flower flower)
        {
            await _service.Edit(id, flower);
        }

        // DELETE: api/Flower/10
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _service.Delete(id);
        }
    }
}
