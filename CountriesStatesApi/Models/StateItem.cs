using System.Text.Json.Serialization;

namespace CountriesStatesApi.Models;

public class StateItem
{
    public long Id { get; set; }
    public string Code { get; set; } = "";
    public string Name { get; set; } = "";
    public long CountryId { get; set;}
    [JsonIgnore]
    public CountryItem? Country { get; set;}
}