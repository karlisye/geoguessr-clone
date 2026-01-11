import React, { useState } from 'react'
import { useGame } from '../Game';
import Marker from './Marker';

const MiniMap = () => {
  const { guessLocation, setGuessLocation } = useGame();

  const [mapSize, setMapSize] = useState({ w:400, h:200 });

  const handleMapClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.x;
    const y = e.clientY - rect.y;
    const xPerc = x / 800 * 100;
    const yPerc = y / 400 * 100;

    setGuessLocation({ xPerc:xPerc, yPerc:yPerc })
  }

  return (
    <div 
      className='fixed bottom-0 right-0 m-2 bg-gray-100 rounded-md overflow-hidden'
      onMouseEnter={() => setMapSize({ w:800, h:400 })}
      onMouseLeave={() => setMapSize({ w:400, h:200 })}
      style={{
        width: mapSize.w,
        height: mapSize.h
      }}
      onClick={handleMapClick}
    >
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/World_location_map_%28equirectangular_180%29.svg/2560px-World_location_map_%28equirectangular_180%29.svg.png" />
    
      {guessLocation && <Marker location={guessLocation} />}

      
    </div>
  )
}

export default MiniMap