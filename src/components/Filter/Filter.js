import React from "react";

const Filter = (props) => {
    
  const filteredList = (event) => {
    props.onChangeFilter(event.target.value);
  };    

  return (
    <div>
      <div className="form-group mr-2">
        <label className="sr-only">Filtar</label>
        <input
          type="text"
          className="form-control"
          onChange={filteredList}
          placeholder="Filtrar por producto"
        ></input>
      </div>
    </div>
  );
};

export default Filter;
