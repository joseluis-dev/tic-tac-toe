import React from 'react'
import '../styles/Square.css'

function Square({ children, handleClick, id }) {
  
  const handleChange = (e) => {
    !Boolean(children) && handleClick(e)
  }

  return (
    <div className='square' id={id} onClick={handleChange}>
      {children}
    </div>
  )
}

export default Square