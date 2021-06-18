import React from "react";
import Categories from "./components/Categories/FormCategories.js";
import Products from "./components/Products/Products.js";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App container-fluid">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Categories />}
          />
          <Route
            path="/info/:country/:categoryID"
            render={() => <Products />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
