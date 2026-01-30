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
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/World_location_map_%28equirectangular_180%29.svg/2560px-World_location_map_%28equirectangular_180%29.svg.png"
          className='absolute inset-0 pointer-events-none'
        />

        <Marker location={guessLocation} />
        <Marker styles='text-green-500' location={realLocation} />

        <Line start={guessLocation} end={realLocation} />
      </div>

      <ActionButton styles='bg-slate-600' onClick={handleContinue} text='Continue' color='blue' />

      <div className='fixed bottom-0 right-0 m-2 flex gap-2'>
        <button onClick={() => setScale(prev => Math.min(prev+0.2, 5))} className='py-1 px-3 bg-slate-900 text-white font-bold rounded-md text-xl hover:cursor-pointer'>+</button>
        <button onClick={() => setScale(prev => Math.max(prev-0.2, 1))} className='py-1 px-3 bg-slate-900 text-white font-bold rounded-md text-xl hover:cursor-pointer'>-</button>
        <button onClick={reset} className='py-1 px-3 bg-slate-900 text-white font-bold rounded-md hover:cursor-pointer italic text-sm'>RESET</button>
      </div>

      <div className='fixed bottom-0 m-8 flex gap-6'>
        <div className='flex gap-2'>
          <div className='w-6 h-6 text-red-600'>
            <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xmlSpace="preserve" stroke="#e00000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path> </g></svg>
          </div>
          <span className='text-slate-500 font-semibold italic'>YOUR GUESS</span>
        </div>

        <div className='flex gap-2'>
          <div className='w-6 h-6 text-green-600'>
            <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xmlSpace="preserve" stroke="#e00000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path> </g></svg>
          </div>
          <span className='text-slate-500 font-semibold italic'>ACTUAL LOCATION</span>
        </div>
      </div>

      <ResultDescription />
    </div>
  )
}

export default ResultView