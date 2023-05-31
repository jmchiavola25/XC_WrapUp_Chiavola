import {useState, useEffect} from 'react';
import Dropdown from './Dropdown.js';

function Countries(props)
{
    const [data, setData] = useState([""]);

    useEffect(() => 
    {
      fetch(props.url).then(data => data.json()).then(data => {
        data.sort((a, b) => (a.name > b.name ? 1 : -1));
        setData(data)});
    },);

    return (
        <div>
            <Dropdown url={"https://xc-countries-api.fly.dev/api/countries/"} className="Select-country" id="countries" type="Country"
                select="country-list" data={data.map(item => [item[props.params[0]], item[props.params[1]], item[props.params[2]]])} onChange={props.onSelectChange}/>
        </div>
    );

}

export default Countries;