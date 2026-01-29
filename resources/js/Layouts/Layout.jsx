import { Link, useForm, usePage } from '@inertiajs/react'
import React from 'react'

const Layout = ({ children }) => {
  const user = usePage().props.auth.user;
  const { post } = useForm();

  const activateMenu = () => {

  }

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

              <form className='ml-auto' onSubmit={(e) => {e.preventDefault(); post('/logout')}}>
                <button className='text-white font-bold bg-gray-600 py-1 px-4 rounded-full italic hover:cursor-pointer hover:scale-105'>LOG OUT</button>
              </form>

              <div 
                className='w-6 h-6 rounded-full border'
                onMouseOver={activateMenu}
              >
                <div className={`absolute w-35 h-60 bg-gray-900 top-17 right-10 rounded-xl`}>

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