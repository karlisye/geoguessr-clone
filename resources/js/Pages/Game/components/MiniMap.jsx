import React, { useState } from 'react'
import { useGame } from '../Game';
import Marker from './Marker';

const MiniMap = () => {
  const { guessLocation, setGuessLocation } = useGame();

  const [mapSize, setMapSize] = useState({ w:400, h:200 });

  const [scale, setScale] = useState(1);

  const handleMapClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.x) / scale;
    const y = (e.clientY - rect.y) / scale;
    const xPerc = x / 800 * 100;
    const yPerc = y / 400 * 100;

    setGuessLocation({ xPerc:xPerc, yPerc:yPerc })
  }

  return (
    <div 
      className='fixed bottom-0 right-0 m-2 bg-gray-100 rounded-md overflow-hidden z-10'
      onMouseEnter={() => setMapSize({ w:800, h:400 })}
      onMouseLeave={() => setMapSize({ w:400, h:200 })}
      style={{
        width: mapSize.w,
        height: mapSize.h
      }}
    >
      <div
        className='relative h-full aspect-2/1'
        onClick={handleMapClick}
      >
        <div
          className='absolute left-0 right-0 bottom-0 top-0'
          style={{
            transform: `scale(${scale})`
          }}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/World_location_map_%28equirectangular_180%29.svg/2560px-World_location_map_%28equirectangular_180%29.svg.png" />
          {guessLocation && <Marker location={guessLocation} />}
        </div>

      </div>
    
      <div className='fixed bottom-0 right-0 m-4 flex gap-1'>
        <button className='bg-white py-2 px-4 rounded-md shadow-md hover:shadow-lg transition' onClick={() => setScale(prev => Math.min(prev+0.2, 5))}>+</button>
        <button className='bg-white py-2 px-4 rounded-md shadow-md hover:shadow-lg transition' onClick={() => setScale(prev => Math.max(prev-0.2, 1))}>-</button>
        <button className='bg-white py-2 px-4 rounded-md shadow-md hover:shadow-lg transition' onClick={() => {setScale(1)}}>Reset</button>
      </div>
    </div>
  )
}

export default MiniMap