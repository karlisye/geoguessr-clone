import React from 'react'
import ResultMap from '../components/ResultMap'
import { useGame } from '../../../contexts/GameContext'

const ResultView = () => {
  const {markerLocation, realLocation, nextLocation } = useGame();
  return (
    <>
      <ResultMap
        markerLocation={markerLocation}
        realLocation={realLocation}
      />

      <button onClick={nextLocation} className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-30 py-2 border-3 rounded-xl font-bold text-xl hover:cursor-pointer mx-auto m-5 bg-green-500 border-green-300 text-white'>
        Next
      </button>
    </>
  )
}

export default ResultView