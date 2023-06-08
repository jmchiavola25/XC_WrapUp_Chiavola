using System.Text.Json.Serialization;

namespace CountriesStatesApi.Models;

public class CountryItem
{
    public long Id { get; set; }
    public string? Code { get; set; }
    public string? Name { get; set; }
    [JsonIgnore]
    public virtual IEnumerable<StateItem>? States { get; set;}
}