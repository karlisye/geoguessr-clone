import React, { useState } from 'react'
import { MAP_WIDTH, MAP_HEIGHT } from '../constants/maps';
import Marker from './Marker';
import { useGame } from '../../../contexts/GameContext';
import { calculateLatLon } from '../services/mapCalculations';

const MiniMap = () => {
  const { markerLocation, setMarkerLocation, setError, setLatLon } = useGame();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    setError('');

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = x / rect.width * 100;
    const percentY = y / rect.height * 100;

    setMarkerLocation({ percentX, percentY });

    const { lat, lon } = calculateLatLon(x, y);
    setLatLon({ lat, lon });
  }
  
  return (
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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        />

        {markerLocation && (
          <Marker 
            location={markerLocation}
            color='red'
          />          
        )}
      </div>
    </div>
  )
}

export default MiniMap