import React, { useEffect, useRef, useState } from 'react'
import Marker from './Marker'
import { useGame } from '../../../contexts/GameContext'
import { calculateXY } from '../services/mapCalculations';
import Line from './Line';

const ResultMap = () => {
  const { markerLocation, setMarkerLocation, realLocation, setRealLocation, locations, locationIndex, latLon } = useGame();
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x:0, y:0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x:0, y:0});

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

  const zoomIn  = () => setScale(prev => Math.min(prev + 0.2, 5));
  const zoomOut  = () => setScale(prev => Math.max(prev - 0.2, 1));
  const resetZoom = () => {
    setScale(1);
    setOffset({ x:0, y:0 })
  }

  const onMouseDown = (e) => {
    setDragging(true);
    dragStart.current = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };
  }

  const onMouseMove = (e) => {
    if (!dragging) return;

    setOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  }

  const onMouseUp = () => setDragging(false);


  return (
    <>
    {realLocation ? (
      <>
      <div className='relative overflow-hidden'
        style={{
          width: imgWidth,
          height: imgHeight,
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        <div
          className='absolute top-0 left-0'
          style={{
            width: imgWidth,
            height: imgHeight,
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: '0 0',
        }}
        >
          <img 
            className='absolute w-full h-full pointer-events-none' 
            src={`images/maps/map1.png`} 
          />

          <Marker location={markerLocation} color='red' />

          <Marker location={realLocation} color='green' />

          <Line start={markerLocation} end={realLocation} />
        </div>

      </div>

      <div className='fixed bottom-0 right-0 m-2 flex gap-2'>
        <button onClick={zoomIn} className='border p-2 text-xl font-bold rounded-md bg-white border-stone-200 hover:cursor-pointer hover:bg-stone-100'>+</button>
        <button onClick={zoomOut} className='border p-2 text-xl font-bold rounded-md bg-white border-stone-200 hover:cursor-pointer hover:bg-stone-100'>-</button>
        <button onClick={resetZoom} className='border p-2 text-xl font-bold rounded-md bg-white border-stone-200 hover:cursor-pointer hover:bg-stone-100'>reset</button>
      </div>
      </>
      ) : (
        <p>Loading</p>
      )}
      </>
  )
}

export default ResultMap