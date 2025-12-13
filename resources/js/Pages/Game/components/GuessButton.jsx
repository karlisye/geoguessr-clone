import React from 'react'
import { useGame } from '../../../contexts/GameContext'

const GuessButton = () => {
  const { handleGuess, markerLocation, error } = useGame();
  return (
    <form method='post' onSubmit={handleGuess} className='absolute bottom-0 left-1/2 transform -translate-x-1/2 m-5 flex flex-col'>
      <button 
        className='px-4 py-2 border-3 rounded-xl font-bold text-xl hover:cursor-pointer mx-auto'
        style={markerLocation ? {
          backgroundColor: 'rgb(82, 176, 68)',
          color: 'white',
          borderColor: 'rgb(188, 255, 178)',
        } : {
          backgroundColor: 'rgb(66, 66, 66)',
          color: 'rgb(153, 153, 153)',
          borderColor: 'rgb(153, 153, 153)',
        }}
      >Guess</button>

      {error && <p className='font-bold text-red-500'>{error}</p>}
    </form>
  )
}

export default GuessButton