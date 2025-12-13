import React, { useState } from 'react'
import ResultMap from '../components/ResultMap'
import { useGame } from '../../../contexts/GameContext'

const ResultView = () => {
  const { nextLocation, locationIndex, locations, distance, score } = useGame();

  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <ResultMap />

      <div className='fixed bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center'>
        <button onClick={nextLocation} className='w-30 py-2 border-3 rounded-xl font-bold text-xl hover:cursor-pointer bg-green-500 border-green-300 text-white'>
          Next
        </button>

        <button
          onClick={() => setIsClicked(prev => !prev)}
          className='bg-white m-2 rounded-md p-2 border border-stone-200'
        >
          {isClicked ? (
            <div>
              <p className='text-xl font-bold'>Guess {locationIndex + 1} / {locations.length}</p>
              <p>Distance: {distance.toFixed(4)} km</p>
              <p>Total score: {score} pts</p>
            </div>
          ) : (
            <p className='text-md font-bold'>Show more</p>
          )}
        </button>
      </div>
        
    </>
  )
}

export default ResultView