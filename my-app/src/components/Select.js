import React from 'react';
import Dropdown from '../Dropdown.js';
import {Row, Col} from 'react-bootstrap';
import './Select.css'

export const Select = (props) => {
    return (
        <div className="selectContents">
                <Row className="dropdownRow">
                    <div className="countriesDropDown">
                        <h2>Select a Country</h2>
                        <Dropdown className="Select-country" id="countries" type="Country" value = "Country"
                        select="country-list" data={props.dataC} onChange={props.onChange}/>
                    </div>
                    <div className="statesDropDown" id="divForStates">
                            <h2>Select a State</h2>
                            <Dropdown className="Select-state" id ="states" type="State" value = "State"
                            select="state-list" data={props.dataS}/>
                    </div>
                </Row>
        </div>
        
    )
}