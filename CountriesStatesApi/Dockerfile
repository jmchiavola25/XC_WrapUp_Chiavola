FROM mcr.microsoft.com/dotnet/sdk:7.0 AS base

WORKDIR /app
COPY ["CountriesStatesApi.csproj", "."]
RUN dotnet restore "./CountriesStatesApi.csproj"
COPY . .

CMD ["dotnet", "watch", "run", "--urls", "http://0:0:0:0:7113"]