import React from 'react'
import Marker from './Marker'
import { useGame } from '../../../contexts/GameContext'

const ResultMap = () => {
  const { markerLocation, realLocation } = useGame();
  return (
    <div className='absolute w-full h-auto'>
      <div className='relative min-w-[1800px] w-[1800px] h-auto mx-auto'>
        <img className='absolute min-w-[1800px] w-[1800px] h-auto' src={`images/maps/map1.png`} />
        <Marker
          location={markerLocation}
          color='red'
        />

        <Marker 
          location={realLocation}
          color='green'
        />

        <div
          className='absolute pointer-events-none border-2 border-dashed border-red-500'
          style={{
            left: markerLocation.x,
            top: markerLocation.y,
            width: Math.sqrt(Math.pow(realLocation.x - markerLocation.x, 2) + Math.pow(realLocation.y - markerLocation.y, 2)),
            height: 2,
            transformOrigin: 'left center',
            transform: `rotate(${Math.atan2(realLocation.y - markerLocation.y, realLocation.x - markerLocation.x)}rad)`,
          }}
        ></div>
      </div>
    </div>
  )
}

export default ResultMap