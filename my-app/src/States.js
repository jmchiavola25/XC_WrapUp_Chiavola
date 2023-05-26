import {useState, useEffect} from 'react';
import Dropdown from './Dropdown.js';

function States(props, {onSelectChange})
{
    const [data, setData] = useState([]);

    useEffect(() => 
    {
      fetch(props.url).then(data => data.json()).then(data => {setData(data)});
    }, [props.url]);

    return (
        <Dropdown url={props.url} className="Select-state" id ="states" type="State"
          select="state-list" data={data}/>
    );

}

export default States;