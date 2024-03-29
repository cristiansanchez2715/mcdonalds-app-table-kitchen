import React from 'react'
import { io } from 'socket.io-client';
import { useState, useRef, useEffect } from 'react';

function Carbuy({setNumberOrders, alert, numberOrders, orderSucessFull, setOrderSucessFull,setTotalPay, tableNumber, buy, setBuy, setProductsToCar, totalPay, productsTocar}) {
  const [messageSocket, setMessageSocket] = useState(null)
  const [errorSocket, setErrorSocket] = useState(null)
  const socketRef = useRef()


  // arquitectura base de datos


  
  
  socketRef.current = io('http://localhost:4000', { path: '/socket' });
   
    
    const sendOrderToKitchen  = async  (e) => {
      e.preventDefault()
      socketRef.current = io('http://localhost:4000', { path: '/socket' });
      setBuy({products: productsTocar, table: tableNumber, totalPayOrder: totalPay})
     setProductsToCar([])
     setOrderSucessFull("Pedido listo. Por favor, espere su turno.")
     setTotalPay(0)
     console.log("esta es la etructura de producst: " + JSON.stringify(productsTocar) + "esto es lo que esta llegando en table:  " + tableNumber + "y esto es lo que esta llegando en el pago: " + totalPay) 
     setNumberOrders(numberOrders += 1)
      try {
        await socketRef.current.emit('nuevoPedido', { table: tableNumber, products: productsTocar, totalPayOrder: totalPay });
        console.log('Pedido enviado al servidor');
        // Lógica adicional después de enviar el pedido
      } catch (error) {
        console.error('Error al enviar el pedido:', error.message);
        setErrorSocket(error.message);
      }
    };
  






    


    


const deleteProductFuncion = (productName) => {

  const findProduct = productsTocar.find((product) => {
return product.name === productName
  })

const deleteProduct = productsTocar.filter((products, index) => {
return products.name !== productName
})
setTotalPay(totalPay - findProduct.price)
setProductsToCar(deleteProduct)

}

  return (
    <div className='container-carbuy'>
{productsTocar && productsTocar.map((product, index) => {
return(
    <div key={index}>
        <h1>Name: {product.name}</h1>
        <h2>Kcal: {product.kcal}</h2>
        <h3>Price: {product.price}</h3>
        <img className='img-carbuy' src={product.imagen} />
        <h4>Date: {product.date}</h4>
        <button onClick={() => deleteProductFuncion(product.name)}>X</button>
        </div>
)
})}

<div className='totalPaiContainer'>
    <button className='primary-button' onClick={(e) => sendOrderToKitchen(e)}>Place Order</button>
    <h1>Total Pay: {totalPay}</h1>
      {alert && <div className='order-sucessfull'>
    <h1 className='ordersucess-h1'>{alert}</h1>
    </div>}
    {orderSucessFull && <div className='order-sucessfull'>
<h1 className='ordersucess-h1'>{orderSucessFull}</h1>

  </div>}


</div>

    </div>
  )
}

export default Carbuy