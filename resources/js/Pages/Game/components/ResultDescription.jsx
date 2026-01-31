import React from 'react'
import { useGame } from '../Game'

const ResultDescription = () => {
  const { score, locationIndex, roundScore, roundDistance, round } = useGame()
  return (
    <div className='fixed top-0 left-0 m-2 bg-slate-900 rounded-md p-2 flex flex-col gap-2 shadow-md'>
      <span className='text-slate-400 font-bold'>Round: <span className='text-slate-200 font-normal'>{round} of 5</span></span>
      
      <div className='border w-full border-slate-600'></div>

      <div className='flex flex-col'>
        <span className='text-slate-400 font-bold'>Distance: <span className='text-slate-200 font-normal'>{roundDistance.toFixed()}m</span></span>
        <span className='text-slate-400 font-bold'>Round score: <span className='text-green-600 font-normal'>+{roundScore.toFixed()}pts</span></span>
      </div>

      <div className='border w-full border-slate-600'></div>

      <span className='text-slate-400 font-bold'>Total score: <span className='text-slate-200 font-normal'>{score.toFixed(2)} pts</span></span>
    </div>
  )
}

export default ResultDescription