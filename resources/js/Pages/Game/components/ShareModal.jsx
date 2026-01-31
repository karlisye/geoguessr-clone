import React, { useState } from 'react'

const ShareModal = ({ currScore, setIsActive }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost/scores/${currScore.user.id}/${currScore.id}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  }
  
  return (
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
            <a
              className={`bg-slate-900 p-2 rounded-lg flex-1 text-center text-slate-400 outline-1 hover:underline hover:cursor-pointer
                ${isCopied ? 'outline-green-600' : 'outline-indigo-800'}
              `}
              target='_blank'
              href={`http://localhost/scores/${currScore.user.id}/${currScore.id}`}
            >{`http://localhost/scores/${currScore.user.id}/${currScore.id}`}</a>

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
  )
}

export default ShareModal