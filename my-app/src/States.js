import {useState, useEffect} from 'react';
import Dropdown from './Dropdown.js';
import AddState from './AddState.js';

function States(props, {onSelectChange})
{
    const [data, setData] = useState([]);

    useEffect(() => 
    {
      fetch(`https://xc-countries-api.fly.dev/api/countries/${props.url}/states/`).then(data => data.json()).then(data => {setData(data)});
      console.log(props.url);
    }, [props.url]);

    return (
        <div>
            <Dropdown url={`https://xc-countries-api.fly.dev/api/countries/${props.url}/states/`} className="Select-state" id ="states" type="State"
                select="state-list" data={data}/>
            <div>
                <AddState countryId = {props.countryId} url={props.url} onChange={props.onSelectChange} className="Enter-state"/>
            </div>
        </div>
    );

}

export default States;