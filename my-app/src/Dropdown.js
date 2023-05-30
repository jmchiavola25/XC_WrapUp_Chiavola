function Dropdown(props)
{
    return (
        <div>
              <select className={props.select} name={props.select} id={props.select} onChange={props.onChange}>
                <option id="default" value="default" name="default">Select a {props.type}</option>
                { props.data.map((item) => {
                  //console.log(item.id);
                  return <option itemId={item.id} value={[item.code, item.id]}>{item.name}</option>
                })}
              </select>
        </div>
    );

}

export default Dropdown;