import './App.css';
import {useState} from 'react';
import States from './States.js';
import Countries from './Countries.js';
import AddCountry from './AddCountry.js';

function App() {

  const url = 'https://xc-countries-api.fly.dev/api/countries/';
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCountryID, setSelectedCountryID] = useState("X");
  const [selectedCountryCode, setSelectedCountryCode] = useState("X");

  //When selected country is changed
  const HandleCountryChange = (event) => {
    setSelectedCountry(event.target);
    setSelectedCountryID(event.target.itemId);
    setSelectedCountryCode(event.target.value.substring(0, event.target.value.indexOf(",")));
    console.log("COUNTRY CODE IS" + event.target.value);

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
        <div className="newCountry">
                <AddCountry className="Enter-country"/>
            </div>
        <div className="statesDropDown" id="divForStates">
          <h2>Select a State</h2>
          <States country={selectedCountry} countryId={selectedCountryID} url={selectedCountryCode} onSelectChange={HandleCountryChange}className="Select-state" id ="states" type="State"
          select="state-list"/>
        </div>
    </div>
  );
}

export default App;