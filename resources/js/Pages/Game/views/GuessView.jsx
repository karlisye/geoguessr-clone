import React from 'react'
import MiniMap from '../components/MiniMap'
import ActionButton from '../components/ActionButton'
import { useGame } from '../Game'

const GuessView = () => {
  const { handleGuess, locations, locationIndex, error } = useGame();
  return (
    <div className='h-full'>
      <img 
        className='h-full w-full absolute object-cover'
        src={locations[locationIndex].url}
      />

      <MiniMap />

      <ActionButton styles='bg-linear-to-b from-green-500 to-green-700' onClick={handleGuess} text='Guess' />

      {error && <p className='absolute bottom-0 left-1/2 transform -translate-x-1/2 text-red-600 font-bold italic bg-red-100 rounded-lg px-4'>{error}</p>}
    </div>
  )
}

export default GuessView