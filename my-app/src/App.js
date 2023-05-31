import './App.css';
import {useState, useEffect} from 'react';
import AddCountry from './AddCountry.js';
import Dropdown from './Dropdown.js';
import AddState from './AddState.js';

function App() {

  const [selectedCountryCode, setSelectedCountryCode] = useState("X");
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);

    useEffect(() => 
    {
      fetch("https://xc-countries-api.fly.dev/api/countries/").then(countryData => countryData.json()).then(countryData => {
        countryData.sort((a, b) => (a.name > b.name ? 1 : -1));
        setCountryData(countryData)});
    },);

    useEffect(() => {
      fetch(`https://xc-countries-api.fly.dev/api/countries/${selectedCountryCode}/states/`).then(stateData => stateData.json()).then(stateData => {
        stateData.sort((a, b) => (a.name > b.name ? 1 : -1));
        setStateData(stateData)});
    }, [selectedCountryCode])

  //When selected country is changed
  const HandleCountryChange = (event) => {
    setSelectedCountryCode(event.target.value);
    console.log("COUNTRY CODE IS " + event.target.value);

  }
  

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Countries and States</h1>
      </header>
      <div className="countriesDropDown">
        <h2>Select a Country</h2>
        <Dropdown className="Select-country" id="countries" type="Country"
          select="country-list" data={countryData.map(item => ({key: item.id, value: item.code, text: item.name}))} onChange={HandleCountryChange}/>
        </div>
        <div className="newCountry">
          <AddCountry className="Enter-country" data={countryData}/>
        </div>
        <div className="statesDropDown" id="divForStates">
          <h2>Select a State</h2>
          <Dropdown className="Select-state" id ="states" type="State"
            select="state-list" data={stateData.map(item => ({key: item.id, value: item.code, text: item.name}))}/>
        </div>
        <div className = "newState">
          <AddState data={countryData} onChange={HandleCountryChange} className="Enter-state"/>
        </div>
    </div>
  );
}

export default App;