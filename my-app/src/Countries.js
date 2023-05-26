import {useState, useEffect} from 'react';
import Dropdown from './Dropdown.js';
import AddCountry from './AddCountry';

function Countries(props)
{
    const [data, setData] = useState([]);

    useEffect(() => 
    {
      fetch(props.url).then(data => data.json()).then(data => {setData(data)});
    },);

    return (
        <div>
            <Dropdown url={"https://xc-countries-api.fly.dev/api/countries/"} className="Select-country" id="countries" type="Country"
                select="country-list" data={data} onChange={props.onSelectChange}/>
            <div>
                <AddCountry data={data} className="Enter-country"/>
            </div>
        </div>
    );

}

export default Countries;