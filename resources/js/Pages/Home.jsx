import { Link, usePage } from '@inertiajs/react'
import React from 'react'

const Home = () => {
  const { user } = usePage().props.auth;
  return (
    <div className='h-full flex flex-col items-center gap-2 italic p-4'>
      {user ? (
        <>
          <span className='text-4xl font-bold'>Start playing!</span>
          <Link href='/play' className='flex justify-center items-center w-50 h-15 text-xl font-bold bg-linear-to-b from-green-500 to-green-800 rounded-full shadow-xl m-4 hover:scale-110 transition-all duration-200 hover:cursor-pointer'>Play</Link>
        </>
      ) : (
        <>
          <span className='text-4xl font-bold'>Log in to unlock the full game!</span>
          <Link href='/login' className='flex items-center justify-center w-50 h-15 text-xl font-bold bg-linear-to-b from-green-500 to-green-800 rounded-full shadow-xl m-4 hover:scale-110 transition-all duration-200 hover:cursor-pointer'>Log in</Link>
        </>
      )}
    </div>
  )
}

export default Home