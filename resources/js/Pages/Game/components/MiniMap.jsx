import React, { useRef, useState } from 'react'
import { useGame } from '../Game';
import Marker from './Marker';

const MiniMap = () => {
  const { guessLocation, setGuessLocation } = useGame();

  const [mapSize, setMapSize] = useState({ w:400, h:200 });
  const [isMapFull, setIsMapFull] = useState(false);

  const [scale, setScale] = useState(1);

  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x:0, y:0 });
  const dragStart = useRef({ x:0, y:0 });

  const [isMsgActive, setIsMsgActive] = useState(false);

  const fullScreenRef = useRef(null);

  const handleMapClick = (e) => {
    if (e.target.textContent === '?' || e.target === fullScreenRef.current || isDragging) return;

    const rect = e.target.getBoundingClientRect();
    const x = (e.clientX - rect.x) / scale;
    const y = (e.clientY - rect.y) / scale;
    const xPerc = x / rect.width * scale * 100;
    const yPerc = y / rect.height * scale * 100;

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

  const reset = () => {
    setScale(1); 
    setOffset({ x:0, y:0 });
  }

  const handleMouseEnter = () => {
    if (!isMapFull) {
      setMapSize({ w:800, h:400 })
      return;
    }
  }

  const handleMouseLeave = () => {
    if (!isMapFull) {
      setMapSize({ w:400, h:200 })
    }
  }

  const handleMapFull = () => {
    if (!isMapFull) {
      setIsMapFull(true);
      setMapSize({ w: window.innerWidth, h: window.innerWidth / 2 });
      return;
    }

    setIsMapFull(false);
    setMapSize({ w:400, h:200 });
  }

  return (
    <div 
      className={`fixed ${isMapFull ? 'mt-4 w-full' : 'bottom-0 m-2 right-0'} bg-gray-100 rounded-md overflow-hidden z-10 transition-all duration-300`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: !isMapFull && mapSize.w,
        height: !isMapFull && mapSize.h
      }}
    >
      <div
        className='relative h-full aspect-2/1'
        onClick={handleMapClick}
        onMouseDown={startDrag}
        onMouseUp={stopDrag}
        onMouseMove={move}
        onMouseLeave={reset}
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

        {mapSize.w>=800 && (
          <>
            <span 
              className='absolute top-0 right-0 text-white rounded-full m-4 w-5 h-5 text-sm flex justify-center items-center bg-slate-900'
              onMouseOver={() => setIsMsgActive(true)}
              onMouseLeave={() => setIsMsgActive(false)}
            >
              ?
            </span>
            {isMsgActive && 
              <div className='absolute bg-slate-950 p-2 rounded-md right-10 top-2'>
                <p className='text-white text-xs'>1. Zoom in and out by clicking the + and - buttons</p>
                <p className='text-white text-xs'>2. Hold mouse down and move to navigate the map</p>
                <p className='text-white text-xs'>3. Click on the map to make a guess</p>
              </div>
            }

            <span
              ref={fullScreenRef}
              className='absolute m-4 w-6 h-6 hover:scale-105 hover:cursor-pointer'
              onClick={handleMapFull}
            >
             <svg className='pointer-events-none' viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="Media" transform="translate(-480.000000, -48.000000)"><g id="fullscreen_fill" transform="translate(480.000000, 48.000000)"><path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fillRule="nonzero"></path><path d="M18.5,5.5 L16,5.5 C15.1716,5.5 14.5,4.82843 14.5,4 C14.5,3.17157 15.1716,2.5 16,2.5 L19,2.5 C20.3807,2.5 21.5,3.61929 21.5,5 L21.5,8 C21.5,8.82843 20.8284,9.5 20,9.5 C19.1716,9.5 18.5,8.82843 18.5,8 L18.5,5.5 Z M8,5.5 L5.5,5.5 L5.5,8 C5.5,8.82843 4.82843,9.5 4,9.5 C3.17157,9.5 2.5,8.82843 2.5,8 L2.5,5 C2.5,3.61929 3.61929,2.5 5,2.5 L8,2.5 C8.82843,2.5 9.5,3.17157 9.5,4 C9.5,4.82843 8.82843,5.5 8,5.5 Z M8,18.5 L5.5,18.5 L5.5,16 C5.5,15.1716 4.82843,14.5 4,14.5 C3.17157,14.5 2.5,15.1716 2.5,16 L2.5,19 C2.5,20.3807 3.61929,21.5 5,21.5 L8,21.5 C8.82843,21.5 9.5,20.8284 9.5,20 C9.5,19.1716 8.82843,18.5 8,18.5 Z M16,18.5 L18.5,18.5 L18.5,16 C18.5,15.1716 19.1716,14.5 20,14.5 C20.8284,14.5 21.5,15.1716 21.5,16 L21.5,19 C21.5,20.3807 20.3807,21.5 19,21.5 L16,21.5 C15.1716,21.5 14.5,20.8284 14.5,20 C14.5,19.1716 15.1716,18.5 16,18.5 Z" fill="currentColor"></path></g></g></g></svg>
            </span>
          </>
        )}
      </div>
    
      <div className='fixed bottom-0 right-0 m-4 flex gap-1'>
        <button className='bg-slate-900 text-white font-bold hover:cursor-pointer py-2 px-4 rounded-md shadow-md hover:shadow-lg transition' onClick={() => setScale(prev => Math.min(prev+0.2, 5))}>+</button>
        <button className='bg-slate-900 text-white font-bold hover:cursor-pointer py-2 px-4 rounded-md shadow-md hover:shadow-lg transition' onClick={() => setScale(prev => Math.max(prev-0.2, 1))}>-</button>
        <button className='bg-slate-900 text-white font-bold hover:cursor-pointer py-2 px-4 rounded-md shadow-md hover:shadow-lg transition italic text-sm' onClick={reset}>RESET</button>
      </div>

    </div>
  )
}

export default MiniMap