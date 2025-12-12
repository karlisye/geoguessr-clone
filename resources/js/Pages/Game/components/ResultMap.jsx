import React, { useEffect, useState } from 'react'
import Marker from './Marker'
import { useGame } from '../../../contexts/GameContext'
import { calculateXY } from '../services/mapCalculations';

const ResultMap = () => {
  const { markerLocation, realLocation, setRealLocation, locations, locationIndex } = useGame();
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    setImgWidth(window.innerWidth);
    setImgHeight(window.innerWidth / 2);

    const { x, y } = calculateXY(locations[locationIndex]);
    const percentX = x / window.innerWidth * 100;
    const percentY = y / window.innerHeight * 100;
    
    setRealLocation({ percentX, percentY, x, y });
  },[]);
  return (
    <>
    {realLocation ? (
      <div className='relative'
        style={{
          width: imgWidth,
          height: imgHeight
        }}
      >
      <img className='absolute' src={`images/maps/map1.png`} />
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
          left: `${markerLocation.percentX}%`,
          top: `${markerLocation.percentY}%`,
          width: Math.sqrt(Math.pow(realLocation.x - markerLocation.x, 2) + Math.pow(realLocation.y - markerLocation.y, 2)),
          height: 2,
          transformOrigin: 'left center',
          transform: `rotate(${Math.atan2(realLocation.y - markerLocation.y, realLocation.x - markerLocation.x)}rad)`,
        }}
      ></div>
      </div>
      ) : (
        <p>Loading</p>
      )}
      </>
  )
}

export default ResultMap