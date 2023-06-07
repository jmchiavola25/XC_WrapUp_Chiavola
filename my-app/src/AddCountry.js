import {useState} from 'react';

function AddCountry(props)
{
    const [isSubmitAllowed, setIsSubmitAllowed] = useState(false);

    const HandleSubmit = (e) => {
        console.log("Submit button clicked!");
        e.preventDefault();

        fetch('https://localhost:7113/api/Countries', {
            method: 'POST', 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({"code": document.getElementById("countryCodeInput").value, "name": document.getElementById("countryNameInput").value})
        }).then(() => {
            console.log("new country added");
            props.onChange();
            setIsSubmitAllowed(false);
        });
    }

    const HandleInput = () => {
        if (document.getElementById("countryCodeInput").value !== ""
        && document.getElementById("countryNameInput").value !== "")
        {
            setIsSubmitAllowed(true);
        }
        else
        {
            setIsSubmitAllowed(false);
        }
    }

    return (
        <div>
            <h2 className="AddACountry">Add a Country</h2>
            <form onChange={HandleInput}>
                <label for="countryIDInput">Enter a Code</label>
                    <input id="countryCodeInput" type="text"></input>
                    <div>
                <label for="countryNameInput">Enter a Name</label>
                    <input id="countryNameInput" type="text"></input>
                    </div>
            </form>
            {isSubmitAllowed && <input type="submit" onClick={HandleSubmit}></input>}
        </div>
    )
}

export default AddCountry;