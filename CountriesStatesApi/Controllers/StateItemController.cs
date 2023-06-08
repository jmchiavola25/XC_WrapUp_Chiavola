using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CountriesStatesApi.Models;

namespace CountriesStatesApi.Controllers
{
    [Route("api/States")]
    [ApiController]
    public class StateItemController : ControllerBase
    {
        private readonly CountriesStatesContext _context;

        public StateItemController(CountriesStatesContext context)
        {
            _context = context;
        }

        // GET: api/StateItem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StateItem>>> GetStateItems()
        {
          if (_context.StateItems == null)
          {
              return NotFound();
          }
            return await _context.StateItems.OrderBy(s => s.Id).ToListAsync();
        }

        // GET: api/StateItem/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StateItem>> GetStateItem(long id)
        {
          if (_context.StateItems == null)
          {
              return NotFound();
          }
            var stateItem = await _context.StateItems.FindAsync(id);

            if (stateItem == null)
            {
                return NotFound();
            }

            return stateItem;
        }

        // PUT: api/StateItem/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStateItem(long id, StateItem stateItem)
        {
            if (id != stateItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(stateItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StateItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/StateItem
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StateItem>> PostStateItem(StateItem newStateItem)
        {
          if (_context.StateItems == null)
          {
              return Problem("Entity set 'CountriesStatesContext.StateItems'  is null.");
          }

          var stateItem = new StateItem 
          {
            Code = newStateItem.Code.ToUpper(),
            Name = newStateItem.Name, 
            CountryId = newStateItem.CountryId
          };
            _context.StateItems.Add(stateItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStateItem", new { id = stateItem.Id }, stateItem);
        }

        // DELETE: api/StateItem/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStateItem(long id)
        {
            if (_context.StateItems == null)
            {
                return NotFound();
            }
            var stateItem = await _context.StateItems.FindAsync(id);
            if (stateItem == null)
            {
                return NotFound();
            }

            _context.StateItems.Remove(stateItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StateItemExists(long id)
        {
            return (_context.StateItems?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
