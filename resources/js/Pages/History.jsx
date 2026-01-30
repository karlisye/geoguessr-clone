import { router, usePage } from '@inertiajs/react'
import React, { useState } from 'react'

const History = ({ scores }) => {
  const user = usePage().props.auth.user;
  const [isActive, setIsActive] = useState(false);
  const [currScore, setCurrScore] = useState({});
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = (score) => {
    setIsActive(true);
    setCurrScore(score);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost/scores/${currScore.user.id}/${currScore.id}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  }

  return (
    <>
    <div className='flex flex-col items-center'>
      <div>
        <h1 className='text-3xl  font-bold italic mt-6 mb-3 text-slate-300'>{user.name.toUpperCase()}S HISTORY</h1>

        <div className='rounded-xl border-gray-600 bg-slate-950 p-6 w-200'>
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
                    {/* <td className={`${index==0?'text-yellow-300':index==1?'text-gray-300':index==2?'text-orange-800':''} p-2`}>#{index+1}</td> */}
                    <td className='p-2 bg-slate-800'>{index+1}</td>
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
                    <td className='p-2 bg-slate-800'>
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
    </div>

    {isActive && (
      <div 
        className='fixed top-0 bottom-0 left-0 right-0 bg-black/50 py-20 md:px-60 px-10'
        onClick={() => setIsActive(false)}
      >
        <div
          className='bg-indigo-950 rounded-xl overflow-hidden'
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className='text-3xl italic font-bold text-center bg-slate-950 p-4'>SHARE YOUR HIGHSCORE</h2>

          <div className='p-4'>
            <p className='text-slate-400 font-bold'>USER: <span className='font-normal text-slate-200'>{currScore.user.name}</span></p>
            <p className='text-slate-400 font-bold'>SCORE: <span className='font-normal text-slate-200'>{currScore.score.toFixed()} pts</span></p>
            <p className='text-slate-400 font-bold'>DATE: <span className='font-normal text-slate-200'>{new Date(currScore.created_at).toLocaleDateString([], {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })} {new Date(currScore.created_at).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric'
            })}</span></p>
          </div>
          
          <div className='px-4'>
            <div className='flex items-center gap-2'>
              <p 
                type="text" 
                className={`bg-slate-900 p-2 rounded-lg flex-1 text-center text-slate-400 outline-1 hover:underline hover:cursor-pointer
                  ${isCopied ? 'outline-green-600' : 'outline-indigo-800'}
                `}
                onClick={() => router.get(`http://localhost/scores/${currScore.user.id}/${currScore.id}`)}
              >{`http://localhost/scores/${currScore.user.id}/${currScore.id}`}</p>

              <button 
                className={`hover:cursor-pointer ${isCopied ? 'text-green-600 hover:text-green-700' : 'text-slate-200 hover:text-slate-400'}`}
                onClick={handleCopy}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                </svg>
              </button>
            </div>

            {isCopied && <p className='text-green-600 font-bold'>Copied!</p>}
          </div>

          <button onClick={() => setIsActive(false)} className='py-1 px-6 m-4 rounded-full bg-slate-600 text-sm font-semibold italic hover:scale-105 hover:cursor-pointer'>CLOSE</button>
        </div>
      </div>
    )}
    </>
  )
}

export default History