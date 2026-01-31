import { Link, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import ShareModal from '../components/ShareModal';

const FinishView = ({ roundData, score }) => {
  const user = usePage().props.auth.user;
  const [isActive, setIsActive] = useState(false);

  return (
    <>
    <div className='flex flex-col items-center p-8'>
      <h1 className='text-3xl font-bold italic text-slate-200 mb-4'>GAME COMPLETE!</h1>

      <div className='p-4 border border-indigo-800 bg-slate-900 rounded-xl flex flex-col gap-4'>
        <div className='flex gap-4 wrap-anywhere'>
          {roundData.map(data => (
            <div key={data.round} className='border-b border-indigo-800 flex flex-col gap-2 py-4'>
              <h2 className='text-xl font-bold italic text-slate-200'>ROUND {data.round}</h2>
              <span className='text-slate-400 font-bold'>DISTANCE: <span className='text-slate-200 font-normal'>{data.roundDistance.toFixed()}m</span></span>
              <span className='text-slate-400 font-bold'>SCORE: <span className='text-slate-200 font-normal'>{data.roundScore.toFixed()}pts</span></span>
            </div>
          ))}
        </div>

        <div className='text-center'>
          <h2 className='text-2xl font-bold italic text-slate-100 my-4'>TOTAL SCORE: <span className='text-green-600'>{score.score.toFixed()}pts</span></h2>
          <span
            className='hover:underline hover:cursor-pointer italic py-1 px-6 rounded-full bg-linear-to-b from-green-500 to-green-700 font-bold'
            onClick={() => setIsActive(true)}
          >
            SHARE
          </span>
        </div>

      </div>

      <div className='flex'>
        <Link href={`/scores/${user.id}`} className='flex items-center justify-center px-6 py-2 text-lg font-bold bg-slate-600 rounded-full shadow-xl m-4 hover:scale-110 transition-all duration-200 hover:cursor-pointer italic'>MY GAMES</Link>
        <Link href='/play' className='flex items-center justify-center px-6 py-2 text-lg font-bold bg-slate-600 rounded-full shadow-xl m-4 hover:scale-110 transition-all duration-200 hover:cursor-pointer italic'>PLAY AGAIN</Link>
        <Link href='/' className='flex items-center justify-center px-6 py-2 text-lg font-bold bg-slate-600 rounded-full shadow-xl m-4 hover:scale-110 transition-all duration-200 hover:cursor-pointer italic'>HOME</Link>
      </div>
    </div>

    {isActive && <ShareModal setIsActive={setIsActive} currScore={score} />}
    </>
  )
}

export default FinishView