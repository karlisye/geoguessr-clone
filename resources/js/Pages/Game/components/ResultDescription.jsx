import React from 'react'
import { useGame } from '../Game'

const ResultDescription = () => {
  const { score, locationIndex } = useGame()
  return (
    <div className='fixed top-0 left-0 m-2 bg-white rounded-md p-2 flex flex-col gap-2 shadow-md'>
      <span>Round: {locationIndex + 1}</span>
      <span>Total score: {score.toFixed(2)} pts</span>
    </div>
  )
}

export default ResultDescription