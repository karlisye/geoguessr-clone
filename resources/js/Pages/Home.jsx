import { Link, usePage } from '@inertiajs/react'
import React from 'react'


const Home = () => {
  const { user } = usePage().props.auth
  return (
    <>
      <h1 className='text-4xl font-bold text-center m-4'>GeoGuessr Clone</h1>
      {user ? (
        <>
        <p className='font-bold text-center m-4'>Welcome back, {user.name}!</p>
        </>
      ) : (
        <>
        <div className='font-bold text-center'>
          <p>Welcome!</p>
          <p>To play the game please <Link className='text-blue-500' href='/login'>log in</Link>.</p>
        </div>
        </>
      )}
    </>
  )
}

export default Home