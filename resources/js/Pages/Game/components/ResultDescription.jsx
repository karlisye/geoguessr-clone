import React from 'react'
import { useGame } from '../Game'

const ResultDescription = () => {
  const { score, locationIndex } = useGame()
  return (
    <div className='fixed top-0 left-0 m-2 bg-slate-900 rounded-md p-2 flex flex-col gap-2 shadow-md'>
      <span className='text-slate-400 font-bold'>Round: <span className='text-slate-200 font-normal'>{locationIndex + 1}</span></span>
      <span className='text-slate-400 font-bold'>Total score: <span className='text-slate-200 font-normal'>{score.toFixed(2)} pts</span></span>
    </div>
  )
}

export default ResultDescription