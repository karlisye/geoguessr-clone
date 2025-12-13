import React, { useEffect, useState } from 'react'
import Marker from './Marker'
import { useGame } from '../../../contexts/GameContext'
import { calculateXY } from '../services/mapCalculations';
import Line from './Line';

const ResultMap = () => {
  const { markerLocation, setMarkerLocation, realLocation, setRealLocation, locations, locationIndex, latLon } = useGame();
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    setImgWidth(window.innerWidth);
    setImgHeight(window.innerWidth / 2);
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

        <Marker location={markerLocation} color='red' />

        <Marker location={realLocation} color='green' />

        <Line start={markerLocation} end={realLocation} />
      </div>
      ) : (
        <p>Loading</p>
      )}
      </>
  )
}

export default ResultMap