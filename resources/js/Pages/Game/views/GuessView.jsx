import React from 'react'
import MiniMap from '../components/MiniMap'
import ActionButton from '../components/ActionButton'
import { useGame } from '../Game'

const GuessView = () => {
  const { handleGuess, locations, locationIndex } = useGame();
  return (
    <div className='h-full'>
      <img 
        className='h-full w-full absolute object-cover'
        src={locations[locationIndex].url}
      />

      <MiniMap />

      <ActionButton onClick={handleGuess} text='Guess' />
    </div>
  )
}

export default GuessView