import React, { useRef, useState } from 'react'
import { useGame } from '../Game';
import Marker from './Marker';

const MiniMap = () => {
  const { guessLocation, setGuessLocation } = useGame();

  const [mapSize, setMapSize] = useState({ w:400, h:200 });

  const [scale, setScale] = useState(1);

  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x:0, y:0 });
  const dragStart = useRef({ x:0, y:0 });

  const handleMapClick = (e) => {
    if (isDragging) return;

    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.x) / scale;
    const y = (e.clientY - rect.y) / scale;
    const xPerc = x / 800 * 100;
    const yPerc = y / 400 * 100;

    setGuessLocation({ xPerc:xPerc, yPerc:yPerc })
  }

  const startDrag = (e) => {
    if (scale === 1) return;
    setIsDragging(false);
    dragStart.current = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    }
  }

  const move = (e) => {
    if (dragStart.current.x !== 0 || dragStart.current.y !== 0) {
      setIsDragging(true);
      setOffset({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    }
  }

  const stopDrag = () => {
    dragStart.current = { x:0, y:0 };
    setTimeout(() => setIsDragging(false), 0);
  }

  return (
    <div 
      className='fixed bottom-0 right-0 m-2 bg-gray-100 rounded-md overflow-hidden z-10'
      onMouseEnter={() => setMapSize({ w:800, h:400 })}
      onMouseLeave={() => setMapSize({ w:400, h:200 })}
      style={{
        width: mapSize.w,
        height: mapSize.h
      }}
    >
      <div
        className='relative h-full aspect-2/1'
        onClick={handleMapClick}
        onMouseDown={startDrag}
        onMouseUp={stopDrag}
        onMouseMove={move}
      >
        <div
          className='absolute left-0 right-0 bottom-0 top-0'
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`
          }}
        >
          <img className='pointer-events-none' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/World_location_map_%28equirectangular_180%29.svg/2560px-World_location_map_%28equirectangular_180%29.svg.png" />
          {guessLocation && <Marker location={guessLocation} />}
        </div>

      </div>
    
      <div className='fixed bottom-0 right-0 m-4 flex gap-1'>
        <button className='bg-white py-2 px-4 rounded-md shadow-md hover:shadow-lg transition' onClick={() => setScale(prev => Math.min(prev+0.2, 5))}>+</button>
        <button className='bg-white py-2 px-4 rounded-md shadow-md hover:shadow-lg transition' onClick={() => setScale(prev => Math.max(prev-0.2, 1))}>-</button>
        <button className='bg-white py-2 px-4 rounded-md shadow-md hover:shadow-lg transition' onClick={() => {setScale(1); setOffset({ x:0, y:0 })}}>Reset</button>
      </div>
    </div>
  )
}

export default MiniMap