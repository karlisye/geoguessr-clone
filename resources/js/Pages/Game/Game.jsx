import { Link } from '@inertiajs/react';
import React, { useState } from 'react'

const MAP_WIDTH = 800;
const MAP_HEIGHT = 400;

const Game = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [markerLocation, setMarkerLocation] = useState(null);

  const handleMouseEnter = (e) => {
    setIsHovered(true)

    if (markerLocation) {
      const x = markerLocation.x * 2;
      const y = markerLocation.y * 2;

      setMarkerLocation({ x, y});
    }
  }

  const handleMouseLeave = (e) => {
    setIsHovered(false)

    if (markerLocation) {
      const x = markerLocation.x / 2;
      const y = markerLocation.y / 2;

      setMarkerLocation({ x, y});
    }
  }

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMarkerLocation({ x, y });
  }

  return (
    <div className='h-screen relative w-screen object-cover'>
      <Link className='py-2 px-6 font-bold text-lg border-2 border-red-300 bg-red-500 rounded-xl absolute m-5 left-0 top-0 text-white z-10' href='/'>Stop</Link>
      
      <img className='absolute w-screen h-screen object-cover' src="images/location1.png" />

      <div className='absolute border-2 bottom-0 right-0 m-5'>
        <div 
          className='relative h-full transition-discrete transition-all duration-300'
          style={{
            width: isHovered ? MAP_WIDTH : MAP_WIDTH / 2,
            height: isHovered ? MAP_HEIGHT : MAP_HEIGHT / 2,
          }}
        >
          <img 
            className='absolute'
            src="images/maps/map1.png"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          />

          {markerLocation && (
            <div 
              className='border-3 border-red-500 absolute rounded-full pointer-events-none transition-discrete transition-all duration-300'
              style={{
                width: '20px',
                height: '20px',
                left: markerLocation.x - 10,
                top: markerLocation.y - 10,
              }}
            ></div>           
          )}
        </div>
      </div>

    </div>
  )
}

Game.layout = page => page;

export default Game