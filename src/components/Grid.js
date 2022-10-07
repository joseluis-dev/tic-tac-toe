import React, { useEffect, useState } from 'react'
import Square from './Square'
import '../styles/Grid.css'

function Grid({ winner, setWinner }) {

  const [value, setValue] = useState(Array(9).fill(null))
  const [isX, setIsX] = useState(true)
  const [moves, setMoves] = useState([])
  const [turn, setTurn] = useState(0)
  const [modify, setModify] = useState(false)
  

  useEffect(() => {
    const winCondition = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8]
    ]

    if (turn >= 5)
      winCondition.map(val => {
        const oWinner = value[val[0]] === 'O' && value[val[1]] === 'O' && value[val[2]] === 'O'
        const xWinner = value[val[0]] === 'X' && value[val[1]] === 'X' && value[val[2]] === 'X'

        if (xWinner) return setWinner('X')
        if (oWinner) return setWinner('O')
        return ''
      })
  }, [turn, value, setWinner])

  const handleClick = (e) => {
    if (!Boolean(winner)) {
      if (moves.length > turn && modify){
        setMoves(moves.splice(turn))
        setModify(false)
      }
      if (isX) {
        const newValue = value.map((val, index) => index === parseInt(e.target.id) ? 'X' : val)
        setValue(newValue)
        setIsX(false)
        setMoves(moves.concat([newValue]))
      } else {
        const newValue = value.map((val, index) => index === parseInt(e.target.id) ? 'O' : val)
        setValue(newValue)
        setIsX(true)
        setMoves(moves.concat([newValue]))
      }
      setTurn(turn + 1)
    }
  }

  return (
    <div className='gameContainer'>
      <div className='gridContainer'>
        {
          value.map((content, index) => 
            <Square
              key={index}
              id={index}
              handleClick={handleClick}
              >
                {content}
            </Square>)
        }
      </div>
      <div className="buttonContainer">
      <button onClick={() => {
        setMoves([])
        setValue(Array(9).fill(null))
        setIsX(true)
        setTurn(0)
        setWinner('')
        }}>
          Reiniciar Juego
      </button>
      {
        moves.map((move, index) => 
          <button 
            key={index}
            onClick={(e) => {
              setValue(move)
              setModify(true)
              setTurn(index + 1)
              if (turn !== index + 1) setWinner('')
              index % 2 === 0 ? setIsX(false) : setIsX(true)
            }}
            >
              Movimiento {index + 1}
          </button>)
      }
      </div>
    </div>
  )
}

export default Grid