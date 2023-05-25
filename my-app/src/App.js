//import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';

function App() {

  const url = 'https://xc-countries-api.fly.dev/api/countries/';
  const selectCountry = document.getElementById('country-list');
  const [data, setData] = useState([]);
  console.log("hello");
  /*const option = document.createElement('option');
  option.innerHTML = "test";
  selectCountry.append(option);*/
  
  
  useEffect(() => 
  {
    fetch(url)
    .then(res => {res.json()})
    .then(res => {
      console.log("yay");

      res.forEach(country => {
        const option = document.createElement('option');
        option.value = country.id;
        option.innerHTML = country.name;
        selectCountry.append(option);
        //setData(prev => [...prev, country]);
    });
  });
  //updateCountries();
});

  const updateCountries = () => {
    data.forEach(country => {
      const option = document.createElement('option');
      option.value = country.id;
      option.innerHTML = country.name;
      selectCountry.append(option);
    });
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Countries and States</h1>
      </header>
      <div>
            <section className="Select-country">
              <label for="countries">Choose a Country</label>
              <select className="country-list" name="country-list" id="country-list">
                {updateCountries()}
              </select>
            </section>
        </div>
        <div>
          <section className="Select-state">
            <label for="states">Choose a State</label>
            <select className="state-list" name="state-list" id="state-list">

            </select>
          </section>
        </div>
    </div>
  );
}

export default App;
