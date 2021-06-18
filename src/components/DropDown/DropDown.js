

const DropDown = (props) => {

    const dropdownChangeHandler = (event) => {
        props.onChangeFilter(event.target.value);
    }

    return (
        <div className="form-group">
        <label>{props.label}</label>
        <select
          value={props.items.selected}
          onChange={dropdownChangeHandler}
          className={`custom-select ${!props.isValid ? 'is-invalid' : ''} `}
        >
           <option defaultValue={props.items.selected} disabled selected>Selecciona</option>
          {props.items.map((data, key) => {
            return (
              <option key={key} value={data.id}>
                {data.name}
              </option>
            );
          })}
        </select>
        {!props.isValid && <small className="text-danger">Campo requerido.</small>}
      </div>
    ); 
};

export default DropDown;