import { Link, useForm, usePage } from '@inertiajs/react'
import React, { useState } from 'react'

const Layout = ({ children }) => {
  const user = usePage().props.auth.user;
  const { post } = useForm();

  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <header>
        <nav className='p-2 py-4 bg-slate-900 text-white shadow-lg flex gap-4 items-center text-xs font-extrabold px-4 italic'>
          <Link className='flex gap-1 items-center' href='/'>
            <img className='h-8' src="https://www.geoguessr.com/_next/static/media/logo-without-tm.0a5d1adf.svg" />
            <span className='not-italic text-red-500 text-xl'>Clone</span>
          </Link>

          {user ? (
            <>
              <Link className='text-xs text-white font-bold bg-linear-to-b from-green-500 to-green-800 py-1 px-4 rounded-full italic hover:cursor-pointer hover:scale-105' href='/play'>PLAY NOW</Link>

              <Link className='text-slate-400' href='/scores'>LEADERBOARD</Link>

              <div 
                className='w-7 h-7 rounded-full border ml-auto'
                onMouseOver={() => setIsActive(true)}
                
              >
                <div 
                  className={`absolute w-45 bg-gray-900 right-10 rounded-xl overflow-hidden mt-10 flex flex-col
                    ${isActive ? '' : 'h-0'}
                  `}
                  onMouseLeave={() => setIsActive(false)}
                >
                  <Link className='py-2 px-4 hover:bg-gray-800 w-full text-left'>PROFILE</Link>
                  <Link className='py-2 px-4 hover:bg-gray-800 w-full text-left'>HISTORY</Link>

                  <div className='w-full border border-gray-600'></div>

                  <form onSubmit={(e) => {e.preventDefault(); post('/logout')}}>
                    <button className='py-2 px-4 text-red-400 hover:cursor-pointer hover:bg-gray-800 w-full text-left'>SIGN OUT</button>
                  </form>
                </div>
              </div>

              

              <span>{user.name}</span>
            </>
          ) : (
            <Link className='text-xs text-white font-bold bg-gray-600 py-1 px-4 rounded-full italic hover:cursor-pointer hover:scale-105 ml-auto' href='/login'>LOG IN</Link>
          )}
        </nav>
      </header>

      <main className='h-screen bg-indigo-950 text-white'>
        {children}
      </main>
    </>
  )
}

export default Layout