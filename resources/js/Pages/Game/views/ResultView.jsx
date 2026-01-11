import React, { useEffect, useRef, useState } from 'react'
import Marker from '../components/Marker'
import { useGame } from '../Game';
import { calculateLocation } from '../calculations/mapCalculations';
import Line from '../components/Line';
import ActionButton from '../components/ActionButton';
import ResultDescription from '../components/ResultDescription';

const ResultView = () => {
  const { guessLocation, locations, locationIndex, handleContinue } = useGame();
  const [realLocation, setRealLocation] = useState(null);

  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x:0, y:0 });
  const dragStart = useRef({ x:0, y:0 });

  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    setRealLocation(calculateLocation(locations[locationIndex]));
  },[]);

  const startDrag = (e) => {
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    };
  }

  const drag = (e) => {
    if (!isDragging) return;

    setOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  }

  const reset = () => {
    setScale(1)
    setOffset({ x:0, y:0 })
  }

  if (!realLocation) return <p>Loading...</p>

  return (
    <div 
      className='relative aspect-2/1'
      onMouseDown={startDrag}
      onMouseUp={() => setIsDragging(false)}
      onMouseMove={drag}
    >
      <div 
        className='absolute inset-0'
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
        }}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/World_location_map_%28equirectangular_180%29.svg/2560px-World_location_map_%28equirectangular_180%29.svg.png"
          className='absolute inset-0 pointer-events-none'
        />

        <Marker location={guessLocation} />
        <Marker location={realLocation} />

        <Line start={guessLocation} end={realLocation} />
      </div>

      <ActionButton onClick={handleContinue} text='Continue' color='blue' />

      <div className='fixed bottom-0 right-0 m-2 flex gap-2'>
        <button onClick={() => setScale(prev => Math.min(prev+0.2, 5))} className='py-1 px-3 bg-white rounded-md text-xl hover:cursor-pointer'>+</button>
        <button onClick={() => setScale(prev => Math.max(prev-0.2, 1))} className='py-1 px-3 bg-white rounded-md text-xl hover:cursor-pointer'>-</button>
        <button onClick={reset} className='py-1 px-3 bg-white rounded-md text-xl hover:cursor-pointer'>reset</button>
      </div>

      <ResultDescription />
    </div>
  )
}

export default ResultView