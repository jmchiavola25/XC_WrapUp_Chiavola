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
    [Route("api/Countries")]
    [ApiController]

    public class CountryItemController : ControllerBase
    {
        private readonly CountriesStatesContext _context;

        public CountryItemController(CountriesStatesContext context)
        {
            _context = context;
        }

        // GET: api/CountryItem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CountryItem>>> GetCountryItems()
        {
          if (_context.CountryItems == null)
          {
              return NotFound();
          }
            return await _context.CountryItems.ToListAsync();
        }

        // GET: api/CountryItem/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CountryItem>> GetCountryItem(long id)
        {
          if (_context.CountryItems == null)
          {
              return NotFound();
          }
            var countryItem = await _context.CountryItems.FindAsync(id);

            if (countryItem == null)
            {
                return NotFound();
            }

            return countryItem;
        }

        // GET: api/CountryItem/5
        [HttpGet("{code}/States")]
        public async Task<ActionResult<IEnumerable<StateItem>>> GetCountryStates(string code)
        {
            if (_context.CountryItems != null)
            {
                var states = _context.StateItems.Where<StateItem>(state => state.Country!.Code == code);

                return await states.OrderBy(s => s.Id).ToListAsync<StateItem>();
            }

            return NotFound();
        }

        // PUT: api/CountryItem/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCountryItem(long id, CountryItem countryItem)
        {
            if (id != countryItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(countryItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CountryItemExists(id))
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

        // POST: api/CountryItem
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CountryItem>> PostCountryItem(CountryItem newCountryItem)
        {
          if (_context.CountryItems == null)
          {
              return Problem("Entity set 'CountriesStatesContext.CountryItems'  is null.");
          }

          var countryItem = new CountryItem
          {
            Code = newCountryItem.Code!.ToUpper(),
            Name = newCountryItem.Name
          };

            _context.CountryItems.Add(countryItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCountryItem), new { id = countryItem.Id }, countryItem);
        }

        // DELETE: api/CountryItem/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountryItem(long id)
        {
            if (_context.CountryItems == null)
            {
                return NotFound();
            }
            var countryItem = await _context.CountryItems.FindAsync(id);
            if (countryItem == null)
            {
                return NotFound();
            }

            _context.CountryItems.Remove(countryItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CountryItemExists(long id)
        {
            return (_context.CountryItems?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
