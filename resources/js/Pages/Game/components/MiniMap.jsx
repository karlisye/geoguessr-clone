import React, { useState } from 'react'
import { MAP_WIDTH, MAP_HEIGHT } from '../constants/maps';
import Marker from './Marker';
import { useGame } from '../../../contexts/GameContext';

const MiniMap = () => {
  const { markerLocation, setMarkerLocation, handleClick } = useGame();
  const [isHovered, setIsHovered] = useState(false);

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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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