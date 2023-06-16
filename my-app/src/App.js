import './App.css';
import {useState, useEffect} from 'react';
import AddCountry from './AddCountry.js';
import Dropdown from './Dropdown.js';
import AddState from './AddState.js';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Container, Row, Col, Form, Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

function App() {

  const [selectedCountryCode, setSelectedCountryCode] = useState("X");
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [updateStates, setUpdateStates] = useState([true]);
  const [updateCountries, setUpdateCountries] = useState([true]);

    useEffect(() => 
    {
      if (updateCountries)
      {
        GetCountries();
        
      }
    },[updateCountries]);

    useEffect(() => {
      if (updateStates)
      {
      fetch(`http://localhost:7113/api/Countries/${selectedCountryCode}/States/`).then(stateData => stateData.json()).then(stateData => {
        stateData.sort((a, b) => (a.name > b.name ? 1 : -1));
        setStateData(stateData)});
        setUpdateStates(false);
        
      }
    }, [selectedCountryCode, updateStates])

    const GetCountries = () => {
      fetch("http://localhost:7113/api/Countries").then(countryData => countryData.json()).then(countryData => {
        countryData.sort((a, b) => (a.name > b.name ? 1 : -1));
        setCountryData(countryData)});
        setUpdateCountries(false);
    }

  //When selected country is changed
  const HandleCountryChange = (event) => {
    if (event.value !== "default")
    {
    
      setSelectedCountryCode(event.target.value);
      UpdateStates();
      console.log("COUNTRY CODE IS " + event.target.value);
  }

  }

  const UpdateCountries = () => {
    setUpdateCountries(true);
  }

  const UpdateStates = () => {
    setUpdateStates(true);
  }
  

  return (
    <div className="App">
      <header className="App-header">
          <Row className="headerRow">
            <Col className= "titleCol">
              <h1 className="App-title">Countries & States</h1>
            </Col>
            <Col className="navCol">
              <Navbar className="mr-auto">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Nav className = "mr-auto">
                  <Col  className= "selectCol">
                  <NavLink to="/select">Select</NavLink>
                  </Col>
                  <Col className="submitCol">
                  <NavLink to="/submit">Submit</NavLink>
                  </Col>
                </Nav>
              </Navbar>
            </Col>
          </Row>
      </header>
      <Container>
        <Row>
          <Col>
      <Form className = "formCountry">
        <div className="countriesDropDown">
          <h2>Select a Country</h2>
          <Dropdown className="Select-country" id="countries" type="Country" value = "Country"
            select="country-list" data={countryData.map(item => ({key: item.id, value: item.code, text: item.name}))} onChange={HandleCountryChange}/>
          </div>
          <div className="newCountry">
            <AddCountry className="Enter-country" data={countryData} onChange={UpdateCountries}/>
          </div>
          </Form>
          </Col>
          <Col>
          <Form className = "formState">
          <div className="statesDropDown" id="divForStates">
            <h2>Select a State</h2>
            <Dropdown className="Select-state" id ="states" type="State" value = "State"
              select="state-list" data={stateData.map(item => ({key: item.id, value: item.code, text: item.name}))}/>
          </div>
          <div className = "newState">
            <AddState data={countryData} onChange={HandleCountryChange} onSubmit={UpdateStates} className="Enter-state"/>
          </div>
          </Form>
          </Col>
          </Row>
      </Container>
    </div>
  );
}

export default App;