import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api.js";
import DropDown from "../DropDown/DropDown.js";
import "./FormCategories.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Categories = (props) => {
  let history = useHistory();
  const [contry, setContry] = useState("");
  const [categorie, setCategorie] = useState("");
  const [listCategories, setListCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validContry, setValidContry] = useState(true);
  const [validCategories, setValidCategories] = useState(true);

  const LISTCONTRYS = [
    { id: "US", name: "USA" },
    { id: "AU", name: "AUSTRIA" },
    { id: "BR", name: "BRASIL" },
    { id: "CA", name: "CANADA" },
    { id: "FR", name: "FRANCIA" },
    { id: "IN", name: "REINO UNIDO" },
  ];


  const getProducts = (params) => {
    setLoading(true);
    api.getCategories(params).then(
      (resp) => {
        setLoading(false);
        if (resp.data === 0) {
          toast.warning("No se encontro información.", {
            position: "bottom-right",
          });
          
        } else {
          setListCategories(resp.data);
        }
      },
      (err) => {
        setLoading(false);
        toast.error("ERROR. Favor de comunicarse con sistemas.", {
          position: "bottom-right"});
      }
    );
  };

  const contryHandler = (event) => {
    setValidContry(true);
    setContry(event);
    getProducts(event);
  };

  const categoriesHandler = (event) => {
    setValidCategories(true);
    setCategorie(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (contry.trim().length === 0 || categorie.trim().length === 0) {
      setValidContry(!contry.trim().length === 0);
      setValidCategories(!categorie.trim().length === 0);
      return;
    }
    const objSession = {
      country: contry,
      categoryID: categorie,
    };
    localStorage.setItem("parameters", JSON.stringify(objSession));
    history.push(`/info/${contry}/${categorie}`);
  };

  return (
    <div>
      <div className="contenedor">
        <div className="categorias">
          <form className="form-row" onSubmit={handleSubmit}>
            <DropDown
              onChangeFilter={contryHandler}
              label={"Seleciona País:"}
              items={LISTCONTRYS}
              isValid={validContry}
            ></DropDown>
            <DropDown
              onChangeFilter={categoriesHandler}
              label={"Seleciona Categoria:"}
              items={listCategories}
              isValid={validCategories}
            ></DropDown>
            <button type="submit" className="btn btn-primary btn-block">
              Procesar
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Categories;
