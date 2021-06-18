import React, { useState, useEffect } from "react";
import Filter from "../Filter/Filter";
import "./Products.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = (props) => {
  let history = useHistory();
  let { country, categoryID } = useParams();
  const [isFilter, setFiltered] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState("");
  const [isListProducts, setListProducts] = useState([]);

  useEffect(() => {
    const validateParams =
      !validateEmptyData(country) && !validateEmptyData(categoryID);
    const parSession = !validateEmptyData(localStorage.getItem("parameters"));
    console.log(localStorage.getItem("parameters"));
    console.log(country, categoryID);
    if (!validateParams && !parSession) {
      history.push("/");
    } else {
      if (validateParams) {
        getProductsPar({ country, categoryID });
      } else {
        getProductsPar(JSON.parse(parSession));
      }
    }
  }, []);

  const getProductsPar = (any) => {
    setLoading(true);
    const params = {
      country: any.country,
      categoryID: any.categoryID,
      page: "1",
      filter:
        "aHR0cHM6Ly93d3cuYW1hem9uLmNvbS9zP2s9aXBob25lJnJoPXBfbl9jb25kaXRpb24tdHlwZSUzQVVzZWQmZGMmcWlkPTE2MTI0MTg5NTMmcmVmPXNyX25yX3Bfbl9jb25kaXRpb24tdHlwZV8y",
    };
    api.getProducts(params).then(
      (resp) => {
        setLoading(false);

   if (resp.data.docs.length === 0) {
          toast.warning("No se encontro información.", {
            position: "bottom-right",
          });
        } else {
          setListProducts(resp.data.docs);
        }        
      },
      (err) => {
        setLoading(false);
        toast.error("ERROR. Favor de comunicarse con sistemas.", {
          position: "bottom-right",
        });
      }
    );
  };

  const validateEmptyData = (data) => {
    let validate = false;
    if (data === undefined || data === null || data === "") {
      validate = true;
    }
    return validate;
  };

  const filterChangeHandler = (filter) => {
    setFiltered(filter);
  };

  const filteredListProduct = isListProducts.filter((product) => {
    if (isFilter.trim().length > 0) {
      return (
        product.product_title.toLowerCase().indexOf(isFilter.toLowerCase()) > -1
      );
    } else {
      return isListProducts;
    }
  });

  const returnHome = () => {
    history.push("/");
  };


  return (
    <div>
      <div className="producto">
        <button onClick={returnHome} className="btn btn-primary"><i class="fa fa-arrow-left fa-4"></i> Regresar</button>
        <div className="buscador">
          <Filter onChangeFilter={filterChangeHandler}></Filter>
          <div>
            <ReactHTMLTableToExcel
              className="btn btn-success"
              table="producto"
              filename="Productos"
              sheet="pagina 1"
              buttonText={`Excel`}
            ></ReactHTMLTableToExcel>
          </div>
        </div>
        <hr></hr>
        {isListProducts && (
          <div className="contenedor-tabla">
            <table className="table table-striped" id="producto">
              <thead >
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Evaluación</th>
                  <th>Vista Previa</th>
                </tr>
              </thead>
              <tbody>
                {filteredListProduct.map((prodcut, index) => {
                  return [
                    <tr key={index}>
                      <th>{prodcut.product_id}</th>
                      <th>{prodcut.product_title}</th>
                      <th>{prodcut.evaluate_rate}</th>
                      <th>
                        <img
                          className="img-previa img-circle"
                          src={prodcut.product_main_image_url}
                        ></img>
                      </th>
                    </tr>,
                  ];
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Products;
