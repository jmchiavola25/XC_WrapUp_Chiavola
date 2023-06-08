using Microsoft.EntityFrameworkCore;

namespace CountriesStatesApi.Models;

public class CountriesStatesContext : DbContext
{
    public CountriesStatesContext(DbContextOptions<CountriesStatesContext> options)
        : base(options)
    {
        DbInitializer.Initialize(this);
    }

    public DbSet<CountryItem> CountryItems { get; set; } = null!;

    public DbSet<StateItem> StateItems { get; set; } = null!;
}