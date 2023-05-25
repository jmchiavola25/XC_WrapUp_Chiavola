import './App.css';
import {useState, useEffect} from 'react';

function App() {

  const url = 'https://xc-countries-api.fly.dev/api/countries/';
  const [data, setData] = useState([]);
  const [showStateList, setShowStateList] = useState(false);
  const [data2, setData2] = useState([]);
  const [stateURL, setStateURL] = useState();
  
  //Update country list
  useEffect(() => 
  {
    fetch(url)
    .then(data => data.json())
    .then(data => {setData(data)});
  });

  //When selected country is changed
  const HandleCountryChange = (event) => {
    setShowStateList(true);
    setStateURL(`https://xc-countries-api.fly.dev/api/countries/${event.target.value}/states/`);
  }

  
  //Update state list
  useEffect(() => {
      if (showStateList)
      {
        console.log(stateURL);
      fetch(stateURL)
      .then(data2 => data2.json())
      .then(data2 => {setData2(data2)})};
    }, [stateURL, showStateList]);
  

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Countries and States</h1>
      </header>
      <div>
            <section className="Select-country">
              <label for="countries">Choose a Country</label>
              <select className="country-list" name="country-list" id="country-list" onChange={HandleCountryChange}>
                <option value="default" name="default">Select a Country</option>
                { data.map((country) => {
                  //console.log(data2);
                  return <option value={country.code}>{country.name}</option>
                })}
              </select>
            </section>
        </div>
        <div className="divForStates" id="divForStates">
          {showStateList && <section className="Select-state" id="Select-state">
            <label for="states">Choose a State</label>
            <select className="state-list" name="state-list" id="state-list">
            <option name="default">Select a State</option>
                { data2.map((state) => {
                  return <option>{state.name}</option>
                })}
              </select>
          </section>}
        </div>
    </div>
  );
}

export default App;
