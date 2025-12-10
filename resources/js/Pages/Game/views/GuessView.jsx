import React from 'react'
import MiniMap from '../components/MiniMap'
import GuessButton from '../components/GuessButton'
import { useGame } from '../../../contexts/GameContext'

const GuessView = () => {
  const { locations, locationIndex } = useGame();
  return (
    <>     
    <img className='absolute w-screen h-screen object-cover' src={`images/${locations[locationIndex]?.url}`} />

    <MiniMap />
    
    <GuessButton />
    </>
  )
}

export default GuessView