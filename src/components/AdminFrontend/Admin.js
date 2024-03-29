import React from "react";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import mcDonaldsLogo from '../../asses/not-found/logo-removebg-preview.png'

function Admin({setVisibilityClientFrontend}) {
  const [receiveOrders, setReceiveOrders] = useState([]);
  const messagesEndRef = useRef(null);
  const socketRef = useRef();
  const [visibilityOrder, setVisibilityOrder] = useState(false)
  const [visibilityProductsOrder, setVisibilityProductsOrder] = useState(false)
const [sendDataState, setSendDataState] = useState()  
const [error, setError] = useState("Base de datos offline")

// enviar pedido a la base de datos

useEffect(() => {
  
  setSendDataState(receiveOrders.map(orderData => orderData.data));
}, [receiveOrders])
// necesito convertir producst en un string usando join
useEffect(() => {
 console.log("esto llegara A LA BASE DE DATOS" + JSON.stringify(sendDataState))
  
  const sendData = async () => {
    try {
      const response = await fetch('http://localhost:5000/dataBaseSend', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"

        },
        body: JSON.stringify(sendDataState)
        // Aquí puedes incluir el cuerpo de tu solicitud si es necesario
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      // Puedes realizar acciones adicionales después de que la solicitud se complete con éxito
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  sendData();
  // setSendDataState({data: null})
}, [sendDataState]);




// useEffect(() => {
//   console.log("este es el contenido de receiveorders order" + {receiveOrders.order})
// }, [receiveOrders])



// desmontando el frontend del cliente

useEffect(() => {
setVisibilityClientFrontend(false)
}, [])



// logica visibilidades pedidos

const functionVisibilityOrder = (e) => {
  e.preventDefault()
  setVisibilityOrder(!visibilityOrder)

}


  // Logica coneccion backend
  const apiSendMessage = "http://localhost:4000/socket";

  useEffect(() => {
    console.log("esto esta llegando al administrador: " + JSON.stringify(receiveOrders))
  
  }, [receiveOrders])

  // traer mensajes desde el chat websocket.io
  useEffect(() => {
    socketRef.current = io("http://localhost:4000", { path: "/socket" });

    socketRef.current.on("pedidoALaCocina", (data) => {
      console.log("esta es la data que llega al admin" + JSON.stringify(data))
  
    console.log("y esta es esa misma data en el etado sendDataState" + sendDataState)
      setReceiveOrders((prevMessages) => [...prevMessages, {  data }]);
      
    });




    // Scroll hacia abajo cuando se recibe un nuevo mensaje
    //   scrollToBottom();

    // Limpieza al desmontar el componente
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [socketRef, receiveOrders]);


  const deleteOrder = (orderTable) => {
const newOrderArray = receiveOrders.filter((order) => {
  return order.table !== orderTable
})
setReceiveOrders(newOrderArray)
  }


// RETURN PRINCIPAL COMPONENTE

return (
  <div className="container-admin">
<div className="container-logo-macdonalds-admin">
<img src={mcDonaldsLogo} className="img-logo-macdonalds-admin" />
<h1>Administrador</h1>
</div>

    <div className="container-bdimpresion">
      <h1>Base de datos impresion</h1>
      <div className="error-container">
        <p >{error}</p>
      </div>

</div>
  <div className="admin-carbuy" >
    <div>
      <h1>Ordenes En Curso</h1>
    </div>
    {receiveOrders.map((orderData, index) => {
      const { data } = orderData; // Accede a la propiedad 'data' en lugar de 'order'
      const { table, products, totalPayOrder } = data; // Accede a las propiedades dentro de 'data'
      return (
        <div key={index}>
          <button onClick={(e) => functionVisibilityOrder(e)}>Orden mesa: {table}<br></br> hora: {products[0].date}</button>
          <button onClick={() => deleteOrder(table)}>X</button>
          {visibilityOrder && (
            <div>
              <h1>Table: {table}</h1>
              <h2>Total Pay: {totalPayOrder}</h2>
              <h3>Products:</h3>
              {products.map((product, productIndex) => (
                <div key={productIndex}>
                  <h4>Name: {product.name}</h4>
                  <p>Kcal: {product.kcal}</p>
                  <p>Price: {product.price}</p>
                  <p>Date: {product.date}</p>
                  <p>Ingredients: {product.ingredients}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    })}
  </div>

  
  </div>
);
}

export default Admin