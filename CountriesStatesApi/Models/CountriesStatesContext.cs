using Microsoft.EntityFrameworkCore;

namespace CountriesStatesApi.Models;

public class CountriesStatesContext : DbContext
{
    public CountriesStatesContext(DbContextOptions<CountriesStatesContext> options)
        : base(options)
    {
        this.Database.EnsureCreated();
    }

    public DbSet<CountryItem> CountryItems { get; set; } = null!;

    public DbSet<StateItem> StateItems { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CountryItem>().HasData(
            new CountryItem{Id = 1, Code = "US", Name = "United States"},
            new CountryItem{Id = 2, Code = "AU", Name = "Australia"}, 
            new CountryItem{Id = 3 ,Code = "CA", Name = "Canada"}
        );

        modelBuilder.Entity<StateItem>().HasData(
            new StateItem{Id = 1, Code = "NC", Name = "North Carolina", CountryId = 1},
            new StateItem{Id = 2, Code = "VA", Name = "Virginia", CountryId = 1},
            new StateItem{Id = 3, Code = "BC", Name = "British Columbia", CountryId = 3},
            new StateItem{Id = 4, Code = "NSW", Name = "New South Wales", CountryId = 2}
        );
    }
    
    
}