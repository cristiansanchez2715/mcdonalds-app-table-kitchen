import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
 Navigate
} from "react-router-dom";
import Barnav from "./components/Frontend1/barnav/Barnav";
import { hamburguesas } from "./Variables";
import React from "react";
import Carbuy from "./components/Carbuy";
import logoMacDonalds from "./asses/logo.jpeg";
import Tables from "./components/Tables";
import Admin from "./components/AdminFrontend/Admin";
import { useNavigate } from "react-router-dom";
import Error from "./components/Error";


function App() {
  const [visibilityHamburguesas, setVisibilityHamburguesas] = useState(false);
  let [visibilityCar, setVisibilityCar] = useState(false);
  let [totalPay, setTotalPay] = useState(0);
  const [productsTocar, setProductsToCar] = useState([]);
  const [buy, setBuy] = useState({ products: null, table: 0, totalPayOrder: 0 });
  let [tableNumber, setTableNumber] = useState(0);
  const [orderSucessFull, setOrderSucessFull] = useState("")
  let [numberOrders, setNumberOrders] = useState(0)
  const[alert, setAlert] = useState("")
  const [visibilityClientFrontend, setVisibilityClientFrontend] = useState(true)
  
  const [securityAdmin, setSecurityAdmin] = useState(false)



// remontando frontend del cliente 

// useEffect(() => {
//   setVisibilityClientFrontend(true)
// }, [])

// FUNCION DE SEGURIDAD PARA EL ADMINISTRADOR



  useEffect(() => {
if(numberOrders >= 3){
  setAlert("Ya ha realizado el maximo de pedidos.")
}
  }, [numberOrders])

  // cuerpo objeto {name: "", kcal: 0, peso: 0, ingredients: ""}

  const addProductToCar = (product) => {
    setTotalPay((totalPay += product.price));

    setProductsToCar((prevState) => [
      ...prevState,
      { ...product, date: new Date().toString() },
    ]);
    setOrderSucessFull("")
    
  };

  const functionMapeoFood = (arrayFood) => {
    return arrayFood.map((food, index) => {
      return (
        <div className="card-food" key={index}>
          <h1>{food.name}</h1>
          <h2>{food.kcal}</h2>
          <p>{food.ingredients}</p>
          <img className="img-food" src={food.imagen} />
          <p>{food.price}</p>
          <button
            className="secondary-button"
            onClick={() => addProductToCar(food)}
          >
            Add To Car
          </button>
        </div>
      );
    });
  };

  return (
    <Router>
      <div className="App">
        {visibilityClientFrontend && (
          <React.Fragment>
              
            <div className="client-container">
              <Barnav
              setVisibilityClientFrontend={setVisibilityClientFrontend}
              setSecurityAdmin={setSecurityAdmin}
                numberOrders={numberOrders}
                setVisibilityHamburguesas={setVisibilityHamburguesas}
                setVisibilityCar={setVisibilityCar}
                visibilityCar={visibilityCar}
              />
              <div className="container-hamburguesas">
             
                <div className="container-logo">
                
                  <img src={logoMacDonalds} className="logo-macdonalds" />
                </div>
                <Tables
                  tableNumber={tableNumber}
                  setTableNumber={setTableNumber}
                />
                {functionMapeoFood(hamburguesas)}
                {visibilityCar && numberOrders < 4 && (
                  <Carbuy
                    setNumberOrders={setNumberOrders}
                    alert={alert}
                    numberOrders={numberOrders}
                    setBuy={setBuy}
                    buy={buy}
                    tableNumber={tableNumber}
                    setTotalPay={setTotalPay}
                    setProductsToCar={setProductsToCar}
                    totalPay={totalPay}
                    productsTocar={productsTocar}
                    orderSucessFull={orderSucessFull}
                    setOrderSucessFull={setOrderSucessFull}
                  />
                )}
              </div>
            </div>
          </React.Fragment>
        )}
  
        <Routes>
          <Route element={securityAdmin ? <Admin setVisibilityClientFrontend={setVisibilityClientFrontend} /> : <Error setVisibilityClientFrontend={setVisibilityClientFrontend} />} path="/admin"></Route>
          <Route element={<Error setVisibilityClientFrontend={setVisibilityClientFrontend}/>} path="/error"/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
