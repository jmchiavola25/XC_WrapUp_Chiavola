namespace CountriesStatesApi.Models;

public static class DbInitializer
{
    public static void Initialize(CountriesStatesContext context)
    {
        context.Database.EnsureCreated();

        if (!context.CountryItems.Any())
        {
            var countries = new CountryItem[]
            {
                new CountryItem{Code = "US", Name = "United States"},
                new CountryItem{Code = "AU", Name = "Australia"}, 
                new CountryItem{Code = "CA", Name = "Canada"}
            };
            foreach (CountryItem c in countries)
            {
                context.CountryItems.Add(c);
            }
            context.SaveChanges();
        }

        if (!context.StateItems.Any())
        {
            var states = new StateItem[]
            {
                new StateItem{Code = "NC", Name = "North Carolina", CountryId = 1},
                new StateItem{Code = "VA", Name = "Virginia", CountryId = 1},
                new StateItem{Code = "BC", Name = "British Columbia", CountryId = 3},
                new StateItem{Code = "NSW", Name = "New South Wales", CountryId = 2}
            };
            foreach (StateItem s in states)
            {
                context.StateItems.Add(s);
            }
            context.SaveChanges();
        }
    }
}