import React, { useEffect } from 'react'
import Marker from './Marker'
import { useGame } from '../../../contexts/GameContext'
import { calculateXY } from '../services/mapCalculations';

const ResultMap = () => {
  const { markerLocation, realLocation, setRealLocation, locations, locationIndex } = useGame();
  useEffect(() => {
    const { x, y } = calculateXY(locations[locationIndex]);
    const percentX = x / window.innerWidth * 100;
    const percentY = y / window.innerHeight * 100;
    console.log(percentY)
    
    setRealLocation({ percentX, percentY });
  },[]);
  return (
    <>
    {realLocation ? (
      <>
      <img className='absolute' src={`images/maps/map1.png`} />
      <Marker
        location={markerLocation}
        color='red'
      />

      <Marker 
        location={realLocation}
        color='green'
      />

      {/* <div
        className='absolute pointer-events-none border-2 border-dashed border-red-500'
        style={{
          left: `${markerLocation.percentX}%`,
          top: `${markerLocation.percentY}%`,
          width: Math.sqrt(Math.pow(realLocation.percentX - markerLocation.percentX, 2) + Math.pow(realLocation.percentY - markerLocation.percentY, 2)),
          height: 2,
          transformOrigin: 'left center',
          transform: `rotate(${Math.atan2(realLocation.percentY - markerLocation.percentY, realLocation.percentX - markerLocation.percentX)}rad)`,
        }}
      ></div> */}
      </>
      ) : (
        <p>Loading</p>
      )}
      </>
  )
}

export default ResultMap