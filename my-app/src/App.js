import './App.css';
import React, {useState, useEffect} from 'react';
import AddCountry from './AddCountry.js';
import Dropdown from './Dropdown.js';
import AddState from './AddState.js';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Container, Row, Col, Form, Navbar, Nav} from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {Select} from './components/Select.js';

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
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container className = "navContainer">
        <Navbar.Brand as={Link} to="/">Countries & States</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/select">Select</Nav.Link>
            <Nav.Link as={Link} to="/submit">Submit</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>
      <Routes>
        <Route path="/select" element={<Select name="Jocelyn" data={countryData.map(item => ({key: item.id, value: item.code, text: item.name}))} onChange={HandleCountryChange}/>}>
        </Route>
      </Routes>
    </div>
      <Container>
        <Row>
          <Col>
            <Form id="formCountry" className = "formCountry">
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