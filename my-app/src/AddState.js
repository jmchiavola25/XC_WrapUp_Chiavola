import {useState} from 'react';
import Dropdown from './Dropdown.js';

function AddState(props)
{
    const [isSubmitAllowed, setIsSubmitAllowed] = useState(false);
    const [countryId, setCountryId] = useState("X");

    const HandleSubmit = (e) => {
        console.log("Submit button clicked!");
        e.preventDefault();

        fetch(`https://localhost:7113/api/States`, {
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
        setCountryId(event.target.value);
    }

    return (
        <div>
            <h2>Add a State</h2>
            <form onChange={HandleInput} id="addStateForm">
                <label for="stateCodeInput">Enter a Code</label>
                    <input id="stateCodeInput" type="text"></input>
                <label for="stateNameInput">Enter a Name</label>
                    <input id="stateNameInput" type="text"></input>
                    <Dropdown className="Select-country" id="countries" type="Country"
                select="country-list" data={props.data.map(item => ({key: item.id, value: item.id, text: item.name}))} onChange={onCountryChange}/>
            </form>
            {isSubmitAllowed && <input type="submit" onClick={HandleSubmit}></input>}
        </div>
    )
}

export default AddState;