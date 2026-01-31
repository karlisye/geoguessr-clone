import { Link, usePage } from '@inertiajs/react'
import React from 'react'

const FinishView = ({ roundData, score }) => {
  const user = usePage().props.auth.user;
  console.log(roundData)
  return (
    <div className='flex flex-col items-center p-8'>
      <h1 className='text-3xl font-bold italic text-slate-200 mb-4'>GAME COMPLETE!</h1>

      <div className='p-4 border border-indigo-800 bg-slate-900 rounded-xl'>
        {roundData.map(data => (
          <div key={data.round} className='border-b border-indigo-800 flex flex-col gap-2 py-4'>
            <h2 className='text-xl font-bold italic text-slate-200'>ROUND {data.round}</h2>
            <span className='text-slate-400 font-bold'>DISTANCE: <span className='text-slate-200 font-normal'>{data.roundDistance.toFixed()}m</span></span>
            <span className='text-slate-400 font-bold'>SCORE: <span className='text-slate-200 font-normal'>{data.roundScore.toFixed()}pts</span></span>
          </div>
        ))}

        <div>
          <h2 className='text-2xl font-bold italic text-slate-100 my-4'>TOTAL SCORE: {score.toFixed()}pts</h2>
        </div>
      </div>

      <Link href={`scores/${user.id}`} className='flex items-center justify-center w-50 h-15 text-xl font-bold bg-linear-to-b from-green-500 to-green-800 rounded-full shadow-xl m-4 hover:scale-110 transition-all duration-200 hover:cursor-pointer italic'>MY GAMES</Link>
    </div>
  )
}

export default FinishView