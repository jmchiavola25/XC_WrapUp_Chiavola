function Dropdown(props)
{

    return (
        <div>
              <select className={props.select} name={props.select} id={props.select} onChange={props.onChange}>
                <option id="default" value="default" name="default" selected disabled hidden>Select a {props.type}</option>
                { props.data.map((item) => {
                  //getValueFromKey(item, props.param);
                  //console.log(Object.entries(item));
                  //console.log(item.id);
                  //console.log(item[props.param]);
                  return <option key={item[0]} value={item[1]}>{item[2]}</option>
                })}
              </select>
        </div>
    );

}

export default Dropdown;