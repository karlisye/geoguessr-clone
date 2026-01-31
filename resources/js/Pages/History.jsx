import { router, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import ShareModal from './Game/components/ShareModal';

const History = ({ scores }) => {
  const user = usePage().props.auth.user;
  const [isActive, setIsActive] = useState(false);
  const [currScore, setCurrScore] = useState({});

  const handleShare = (score) => {
    setIsActive(true);
    setCurrScore(score);
  }

  return (
    <>
    <div className='pt-10'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl  font-bold italic mt-6 mb-3 text-slate-300'>{user.name.toUpperCase()}S HISTORY</h1>

        <div className='border border-gray-600 rounded-lg overflow-hidden'>
          <table className='w-full text-slate-100'>
            <thead>
              <tr className='border-b border-gray-600'>
                <th className='text-left p-2 bg-gray-900 text-slate-400'>#</th>
                <th className='text-left p-2 bg-gray-900 text-slate-400'>SCORE</th>
                <th className='text-left p-2 bg-gray-900 text-slate-400'>DATE</th>
                <th className='text-left p-2 bg-gray-900 text-slate-400'></th>
              </tr>
            </thead>

            <tbody>
              {scores.map((score, index) => (
                <tr className='border-b border-gray-600' key={score.id}>
                  <td className='p-2 bg-slate-800'>#{index+1}</td>
                  <td className='p-2 bg-slate-800'>{score.score.toFixed()} pts</td>
                  <td className='p-2 bg-slate-800'>{new Date(score.created_at).toLocaleDateString([], {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })} {new Date(score.created_at).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric'
                  })}</td>
                  <td className='p-2 bg-slate-800 flex justify-end px-4'>
                    <span
                      className='hover:underline hover:cursor-pointer italic py-1 px-6 rounded-full bg-linear-to-b from-green-500 to-green-700 font-bold'
                      onClick={() => handleShare(score)}
                    >
                      SHARE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {isActive && <ShareModal setIsActive={setIsActive} currScore={currScore} />}
    </>
  )
}

export default History