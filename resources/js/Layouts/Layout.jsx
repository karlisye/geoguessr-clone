import { Link, useForm, usePage } from '@inertiajs/react'
import React from 'react'

const Layout = ({ children }) => {
  const user = usePage().props.auth.user;
  const { post } = useForm();

  return (
    <>
      <header>
        <nav className='p-2 py-4 bg-slate-900 text-white shadow-lg flex gap-4 items-center text-sm font-extrabold px-4 italic'>
          <Link className='flex gap-1 items-center' href='/'>
            <img className='h-8' src="https://www.geoguessr.com/_next/static/media/logo-without-tm.0a5d1adf.svg" />
            <span className='not-italic text-red-500 text-xl'>Clone</span>
          </Link>

          {user ? (
            <>
              <Link className='text-xs text-white font-bold bg-linear-to-b from-green-500 to-green-800 py-1 px-4 rounded-full italic hover:cursor-pointer hover:scale-105' href='/play'>PLAY NOW</Link>

              <form className='ml-auto' onSubmit={(e) => {e.preventDefault(); post('/logout')}}>
                <button className='text-white font-bold bg-gray-600 py-1 px-4 rounded-full italic hover:cursor-pointer hover:scale-105'>Log out</button>
              </form>
            </>
          ) : (
            <Link className='text-xs text-white font-bold bg-gray-600 py-1 px-4 rounded-full italic hover:cursor-pointer hover:scale-105 ml-auto' href='/login'>Log in</Link>
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