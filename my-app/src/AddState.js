import {useState} from 'react';
import Countries from './Countries.js';

function AddState(props)
{
    const [isSubmitAllowed, setIsSubmitAllowed] = useState(false);
    const [countryId, setCountryId] = useState("X");

    const HandleSubmit = (e) => {
        console.log("Submit button clicked!");
        e.preventDefault();
        console.log("COUNTRY ID IN ADD STATE IS: " + props.countryId);

        fetch(`https://xc-countries-api.fly.dev/api/states/`, {
            method: 'POST', 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({"code": document.getElementById("stateCodeInput").value, "name": document.getElementById("stateNameInput").value, "countryId": countryId})
        }).then(() => {
            console.log("new state added");
            setIsSubmitAllowed(false);
        });
    }

    function HandleInput() {
        if (document.getElementById("stateCodeInput").value !== ""
        && document.getElementById("stateNameInput").value !== "")
        {
            setIsSubmitAllowed(true);
        }
        else
        {
            setIsSubmitAllowed(false);
        }
    }

    const onCountryChange = (event) => 
    {
        setCountryId(event.target.value.substring(event.target.value.indexOf(",") + 1, event.target.value.length));
    }

    return (
        <div>
            <h2>Add a State</h2>
            <form onChange={HandleInput}>
                <label for="stateCodeInput">Enter a Code</label>
                    <input id="stateCodeInput" type="text"></input>
                <label for="stateNameInput">Enter a Name</label>
                    <input id="stateNameInput" type="text"></input>
                <Countries url={'https://xc-countries-api.fly.dev/api/countries/'} className="Select-country" id="countries" type="Country"
                select="country-list" onSelectChange={onCountryChange}/>
            </form>
            {isSubmitAllowed && <input type="submit" onClick={HandleSubmit}></input>}
        </div>
    )
}

export default AddState;