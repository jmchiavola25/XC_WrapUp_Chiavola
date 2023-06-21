import React from 'react';
import Dropdown from '../Dropdown.js';

export const Select = (props) => {
    return (
        <div>
            <h1>This is the select component for {props.name}.</h1>
            <div className="countriesDropDown">
                <h2>Select a Country</h2>
                <Dropdown className="Select-country" id="countries" type="Country" value = "Country"
                  select="country-list" data={props.data} onChange={props.onChange}/>
              </div>
        </div>
        
    )
}