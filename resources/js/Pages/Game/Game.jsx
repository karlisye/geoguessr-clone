import { Link } from '@inertiajs/react';
import React from 'react'

const Game = () => {
  return (
    <div className='h-screen relative'>

        <Link className='py-2 px-6 font-bold text-lg border-2 border-red-300 bg-red-500 rounded-xl absolute left-1/2 bottom-5 text-white transform -translate-x-1/2' href='/'>Stop</Link>
    </div>
  )
}

Game.layout = page => page;

export default Game