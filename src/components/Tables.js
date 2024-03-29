import React from 'react'
import { useState } from 'react'

function Tables({tableNumber, setTableNumber}) {


const selectTable = (numberTable) => {
setTableNumber(numberTable)
}

const challangeTableFunction = (e) => {
  e.preventDefault()
  setTableNumber(0)
}


  return (
    <div className='container-buttons'>
        <button className='table-button' disabled={tableNumber > 0} onClick={() =>selectTable(1)}>Mesa 1</button>
        <button className='table-button'  disabled={tableNumber > 0} onClick={() =>selectTable(2)}>Mesa 2</button>
        <button className='table-button'  disabled={tableNumber > 0} onClick={() =>selectTable(3)}>Mesa 3</button>
        <button className='table-button'  disabled={tableNumber > 0} onClick={() =>selectTable(4)}>Mesa 4</button>
        <button className='table-button'  disabled={tableNumber > 0} onClick={() =>selectTable(5)}>Mesa 5</button>
        <button className='table-button'  disabled={tableNumber > 0} onClick={() =>selectTable(6)}>Mesa 6</button>
        <button className='table-button'  disabled={tableNumber > 0} onClick={() =>selectTable(7)}>Mesa 7</button>
        <button className='table-button'  disabled={tableNumber > 0} onClick={() =>selectTable(8)}>Mesa 8</button>
        <button className='table-button'  disabled={tableNumber > 0} onClick={() =>selectTable(9)}>Mesa 9</button>
     
        <div className='container-btn-challange'>
        <button className='primary-button' onClick={(e) =>challangeTableFunction(e)}>Challange</button>
        <h1>Mesa: {tableNumber}</h1>
        </div>
    </div>
  )
}

export default Tables