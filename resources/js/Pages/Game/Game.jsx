import { Link, router, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react'

const MAP_WIDTH = 800;
const MAP_HEIGHT = 400;

const Game = ({ locations }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [markerLocation, setMarkerLocation] = useState(null);
  const [realLocation, setRealLocation] = useState(null);
  const [latLon, setLatLon] = useState({});
  const [error, setError] = useState('');
  const [locationIndex, setLocationIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState(0);
  const [isGuessing, setIsGuessing] = useState(true);

  const { user } = usePage().props.auth;

  const handleMouseEnter = (e) => {
    setIsHovered(true)

    if (markerLocation) {
      const x = markerLocation.x * 2;
      const y = markerLocation.y * 2;

      setMarkerLocation({ x, y});
    }
  }

  const handleMouseLeave = (e) => {
    setIsHovered(false)

    if (markerLocation) {
      const x = markerLocation.x / 2;
      const y = markerLocation.y / 2;

      setMarkerLocation({ x, y});
    }
  }

  const handleClick = (e) => {
    setError('');

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMarkerLocation({ x, y });

    const { lat, lon } = calculateLatLon(x, y);
    setLatLon({ lat, lon });
  }

  const calculateLatLon = (x, y) => {
    const lat = 90 - (y/MAP_HEIGHT) * 180;
    const lon = (x/MAP_WIDTH) * 360 - 180;
    return { lat, lon };
  }

  const handleGuess = (e) => {
    e.preventDefault();

    if (!markerLocation) {
      setError('Please place a marker before guessing!');
      return;
    }

    calculateDistance();
    
    setMarkerLocation(() => calculateXY(latLon));
    setRealLocation(() => calculateXY(locations[locationIndex]));

    setIsGuessing(false);
  }

  const calculateXY = ({ lat, lon }) => {
    const x = ((lon + 180) / 360) * 1800;
    const y = ((90 - lat) / 180) * 900;

    return { x, y };
  }

  const calculateDistance = () => {
    const { lat:lat1, lon:lon1 } = latLon;
    const { lat:lat2, lon:lon2 } = locations[locationIndex];

    const R = 6371;
    const deltaLat = Math.PI / 180 * (lat2 - lat1);
    const deltaLon = Math.PI / 180 * (lon2 - lon1);

    const a = 
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(Math.PI / 180 * lat1) *
      Math.cos(Math.PI / 180 * lat2) *
      Math.sin(deltaLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    // console.log('distance: ', distance);
    setDistance(distance);

    const roundScore = Math.round(5000 * Math.exp(-distance / 2000));
    // console.log('score: ', roundScore);

    setScore(() => score + roundScore);
  }

  const nextLocation = () => {
    if (locations[locationIndex + 1]) {
      setLocationIndex(() => locationIndex + 1);
      setIsGuessing(true);
      setMarkerLocation(null);
    } else {
      router.post('/scores/store', {
        user_id: user.id,
        score: score
      });
    }
  }

  return (
    <div className='h-screen relative w-screen object-cover'>
      <Link className='py-2 px-6 font-bold text-lg border-2 border-red-300 bg-red-500 rounded-xl absolute m-5 left-0 top-0 text-white z-10' href='/'>Stop</Link>
      {isGuessing ? (
        <>
        
        <img className='absolute w-screen h-screen object-cover' src={`images/${locations[locationIndex].url}`} />

        <div className='absolute border-2 bottom-0 right-0 m-5'>
          <div 
            className='relative h-full transition-discrete transition-all duration-300'
            style={{
              width: isHovered ? MAP_WIDTH : MAP_WIDTH / 2,
              height: isHovered ? MAP_HEIGHT : MAP_HEIGHT / 2,
            }}
          >
            <img 
              className='absolute'
              src="images/maps/map1.png"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            />

            {markerLocation && (
              <div 
                className='border-3 border-red-500 absolute rounded-full pointer-events-none transition-discrete transition-all duration-300'
                style={{
                  width: '20px',
                  height: '20px',
                  left: markerLocation.x - 10,
                  top: markerLocation.y - 10,
                }}
              ></div>           
            )}
          </div>
        </div>
        
        <form method='post' onSubmit={handleGuess} className='absolute bottom-0 left-1/2 transform -translate-x-1/2 m-5 flex flex-col'>
          <button 
            className='w-30 py-2 border-3 rounded-xl font-bold text-xl hover:cursor-pointer mx-auto'
            style={markerLocation ? {
              backgroundColor: 'rgb(82, 176, 68)',
              color: 'white',
              borderColor: 'rgb(188, 255, 178)',
            } : {
              backgroundColor: 'rgb(66, 66, 66)',
              color: 'rgb(153, 153, 153)',
              borderColor: 'rgb(153, 153, 153)',
            }}
          >Guess</button>

          {error && <p className='font-bold text-red-500'>{error}</p>}
        </form>
        </>
      ) : (
        <>
        <div className='absolute w-full h-auto'>
          <div className='relative min-w-[1800px] w-[1800px] h-auto mx-auto'>
            <img className='absolute min-w-[1800px] w-[1800px] h-auto' src={`images/maps/map1.png`} />
            <div 
              className='border-3 border-red-500 absolute rounded-full pointer-events-none transition-discrete transition-all duration-300'
              style={{
                width: '20px',
                height: '20px',
                left: markerLocation.x - 10,
                top: markerLocation.y - 10,
              }}
            ></div>

            <div 
              className='border-3 border-green-500 absolute rounded-full pointer-events-none transition-discrete transition-all duration-300'
              style={{
                width: '20px',
                height: '20px',
                left: realLocation.x - 10,
                top: realLocation.y - 10,
              }}
            ></div>

            <div
              className='absolute pointer-events-none border-2 border-dashed border-red-500'
              style={{
                left: markerLocation.x,
                top: markerLocation.y,
                width: Math.sqrt(Math.pow(realLocation.x - markerLocation.x, 2) + Math.pow(realLocation.y - markerLocation.y, 2)),
                height: 2,
                transformOrigin: 'left center',
                transform: `rotate(${Math.atan2(realLocation.y - markerLocation.y, realLocation.x - markerLocation.x)}rad)`,
              }}
            ></div>
          </div>
        </div>

          <button onClick={nextLocation} className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-30 py-2 border-3 rounded-xl font-bold text-xl hover:cursor-pointer mx-auto m-5 bg-green-500 border-green-300 text-white'>
            Next
          </button>
        </>
      )}


    </div>
  )
}

Game.layout = page => page;

export default Game