function Dropdown(props)
{

    return (
        <div>
              <select className={props.select} name={props.select} id={props.select} onChange={props.onChange} defaultValue = "--">
                <option id="default" value="default" name="default" selected>Select a {props.type}</option>
                { props.data.map((item) => {
                  return <option key={item.key} value={item.value}>{item.text}</option>
                })}
              </select>
        </div>
    );

}

export default Dropdown;