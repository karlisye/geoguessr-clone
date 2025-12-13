import React, { useEffect, useState } from 'react'
import Marker from './Marker'
import { useGame } from '../../../contexts/GameContext'
import { calculateXY } from '../services/mapCalculations';

const ResultMap = () => {
  const { markerLocation, setMarkerLocation, realLocation, setRealLocation, locations, locationIndex, latLon } = useGame();
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    setImgWidth(window.innerWidth);
    setImgHeight(window.innerWidth / 2);
    console.log(markerLocation)
  },[]);

  useEffect(() => {
    setRealLocation(() => getLocation(locations[locationIndex]));

    setMarkerLocation(() => getLocation(latLon));
  }, [imgWidth, imgHeight]);

  const getLocation = ({ lat, lon }) => {
    const { x, y } = calculateXY({ lat, lon });
    const percentX = x / imgWidth * 100;
    const percentY = y / imgHeight * 100;
    return { percentX, percentY, x, y };
  }

  return (
    <>
    {realLocation ? (
      <div className='relative'
        style={{
          width: imgWidth,
          height: imgHeight
        }}
      >
      <img className='absolute w-full' src={`images/maps/map1.png`} />
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
          width: Math.sqrt(Math.pow(realLocation.x - markerLocation.x, 2) + Math.pow(realLocation.y - markerLocation.y, 2)),
          height: 2,
          transformOrigin: 'left center',
          transform: `rotate(${Math.atan2(realLocation.y - markerLocation.y, realLocation.x - markerLocation.x)}rad)`,
        }}
      ></div> */}
      </div>
      ) : (
        <p>Loading</p>
      )}
      </>
  )
}

export default ResultMap