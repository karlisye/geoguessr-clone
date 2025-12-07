import { Link } from '@inertiajs/react';
import React, { useState } from 'react'

const MAP_WIDTH = 800;
const MAP_HEIGHT = 400;

const Game = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = (e) => {
    setIsHovered(true)
  }

  const handleMouseLeave = (e) => {
    setIsHovered(false)
  }

  return (
    <div className='h-screen relative w-screen object-cover'>
      <Link className='py-2 px-6 font-bold text-lg border-2 border-red-300 bg-red-500 rounded-xl absolute m-5 left-0 top-0 text-white z-10' href='/'>Stop</Link>
      
      <img className='absolute w-screen h-screen object-cover' src="images/location1.png" />

      <div className='absolute border-2 bottom-0 right-0 m-5'>
        <img 
          className='transition-discrete transition-all duration-300'
          src="images/maps/map1.png"
          style={{
            width: isHovered ? MAP_WIDTH : MAP_WIDTH / 2,
            height: isHovered ? MAP_HEIGHT : MAP_HEIGHT / 2,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </div>
  )
}

Game.layout = page => page;

export default Game