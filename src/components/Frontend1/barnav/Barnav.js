import React from 'react'
import { NavLink, useNavigate, } from 'react-router-dom'
import { useState } from 'react'

function Barnav({setSecurityAdmin, setVisibilityClientFrontend, numberOrders, setVisibilityHamburguesas, setVisibilityCar, visibilityCar}) {
  const [password, setPassword] = useState("1234")
  const navigate = useNavigate()

  // LOGICA SEGURIDAD ADMINISTRADOR
  
const verificationPasswordSecurity = (e) => {
  e.preventDefault()
  const challangeUser = prompt("Digite la contraseña del establecimiento")
if(challangeUser === password){
openAdmin()
}
else{
  alert("contraseña incorrecta")
}


}

const openAdmin = () => {

navigate("/admin")
setVisibilityClientFrontend(false)
setSecurityAdmin(true)
} 




// FUNCIONES RELACIONADAS AL CARRITO


  const visibilityCarFunction = (e) => {
    e.preventDefault()
    setVisibilityCar(!visibilityCar)
  }
  


const funcionChallengeVisibility = () => {
setVisibilityHamburguesas(true)

}

  return (
    <div className='container-buttons-barnav'>
      <button onClick={(e) => verificationPasswordSecurity(e)} className='primary-button'>Administrador </button>
     {  numberOrders < 4 && <button className='primary-button' onClick={(e) => visibilityCarFunction(e)}>Car Buy</button> }
    </div>
  )
}

export default Barnav