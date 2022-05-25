using Microsoft.AspNetCore.Mvc;
using ResidentSleeper.Attributes;
using ResidentSleeper.Contexts;
using ResidentSleeper.Models;
using ResidentSleeper.Services.FlowerService;
using System.Threading.Tasks;
using static ResidentSleeper.Constants.Constants;

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
        [Audit]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var flowers = await Task.Run(() => _service.GetAll());
            if (flowers == null)
                return NoContent();
            return Ok(flowers);
        }

        // GET: api/Flower/id/10
        [Audit]
        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (id < 1)
                return BadRequest();
            var flower = await Task.Run(() => _service.GetById(id));
            if (flower == null)
                return NotFound();
            return Ok(flower);
        }

        // GET: api/Flower/type/5
        [Audit]
        [HttpGet("type/{type}")]
        public async Task<IActionResult> GetByType(int type)
        {
            var flowerType = (FlowerType)type;
            var flowers = await Task.Run(() => _service.GetByType(type));
            if (flowers == null)
                return NoContent();
            return Ok(flowers);
        }

        // GET: api/Flower/name/tulpe
        [Audit]
        [HttpGet("name/{name}")]
        public async Task<IActionResult> GetByName(string name)
        {
            var flowers = await Task.Run(() => _service.GetByName(name));
            if (flowers == null)
                return NoContent();
            return Ok(flowers);
        }

        // POST: api/Flower
        [Audit]
        [HttpPost]
        public async Task<IActionResult> Add(Flower flower)
        {
            if (await Task.Run(() => _service.Add(flower)) != 1)
                return Problem();
            return CreatedAtAction(nameof(Add), new { id = flower.ID }, flower);
        }

        // PUT: api/Flower/10
        [Audit]
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(int id, Flower flower)
        {
            if (flower == null)
                return NotFound();

            var oldFlower = _service.GetById(id);
            if (oldFlower == null)
                return NotFound();

            if (await Task.Run(() => _service.Edit(oldFlower, flower)) != 1)
                return Problem();

            return Ok();
        }

        // DELETE: api/Flower/10
        [Audit]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var flower = _service.GetById(id);
            if (flower == null)
                return NotFound();

            int rowsAffected = await Task.Run(() => _service.Delete(flower));
            if (rowsAffected != 1)
                return Problem();

            return Ok();
        }
    }
}