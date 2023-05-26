import './App.css';
import {useState} from 'react';
import States from './States.js';
import Countries from './Countries.js';
import AddCountry from './AddCountry.js';

function App() {

  const url = 'https://xc-countries-api.fly.dev/api/countries/';
  const [stateURL, setStateURL] = useState("https://xc-countries-api.fly.dev/api/countries/TD/states/");

  //When selected country is changed
  const HandleCountryChange = (event) => {
    setStateURL(`https://xc-countries-api.fly.dev/api/countries/${event.target.value}/states/`);
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Countries and States</h1>
      </header>
      <div className="countriesDropDown">
        <h2>Select a Country</h2>
            <Countries url={url} className="Select-country" id="countries" type="Country"
            select="country-list" onSelectChange={HandleCountryChange}/>
        </div>
        <div className="statesDropDown" id="divForStates">
          <h2>Select a State</h2>
          <States url={stateURL} className="Select-state" id ="states" type="State"
          select="state-list"/>
        </div>
    </div>
  );
}

export default App;