import React, { useEffect, useRef, useState } from 'react'
import Marker from '../components/Marker'
import { useGame } from '../Game';
import { calculateLocation } from '../calculations/mapCalculations';
import Line from '../components/Line';
import ActionButton from '../components/ActionButton';
import ResultDescription from '../components/ResultDescription';

const ResultView = () => {
  const { guessLocation, locations, locationIndex, handleContinue, round } = useGame();
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
    if (!isDragging || scale===1) return;

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
          src="images/maps/map.png"
          className='absolute inset-0 pointer-events-none'
        />

        <Marker location={guessLocation} />
        <Marker styles='text-green-500' location={realLocation} />

        <Line start={guessLocation} end={realLocation} />
      </div>

      <ActionButton styles='bg-slate-600' onClick={handleContinue} text={round===5 ? 'Finish' : 'Continue'} color='blue' />

      <div className='fixed bottom-0 right-0 m-2 flex gap-2'>
        <button onClick={() => setScale(prev => Math.min(prev+0.2, 5))} className='py-1 px-3 bg-slate-900 text-white font-bold rounded-md text-xl hover:cursor-pointer'>+</button>
        <button onClick={() => setScale(prev => Math.max(prev-0.2, 1))} className='py-1 px-3 bg-slate-900 text-white font-bold rounded-md text-xl hover:cursor-pointer'>-</button>
        <button onClick={reset} className='py-1 px-3 bg-slate-900 text-white font-bold rounded-md hover:cursor-pointer italic text-sm'>RESET</button>
      </div>

      <div className='fixed bottom-0 m-8 flex gap-6'>
        <div className='flex gap-2'>
          <div className='w-6 h-6 text-red-600'>
            <svg 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12,2C8.1,2,5,5.1,5,9c0,6,7,13,7,13s7-7.1,7-13C19,5.1,15.9,2,12,2z M12,11.5c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5 s2.5,1.1,2.5,2.5S13.4,11.5,12,11.5z"></path>
            </svg>            
          </div>
          <span className='text-slate-500 font-semibold italic'>YOUR GUESS</span>
        </div>

        <div className='flex gap-2'>
          <div className='w-6 h-6 text-green-600'>
            <svg 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12,2C8.1,2,5,5.1,5,9c0,6,7,13,7,13s7-7.1,7-13C19,5.1,15.9,2,12,2z M12,11.5c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5 s2.5,1.1,2.5,2.5S13.4,11.5,12,11.5z"></path>
            </svg>          
          </div>
          <span className='text-slate-500 font-semibold italic'>ACTUAL LOCATION</span>
        </div>
      </div>

      <ResultDescription />
    </div>
  )
}

export default ResultView