import { Link, router, usePage } from '@inertiajs/react';
import React, { useState } from 'react'
import GuessView from './views/GuessView';
import ResultView from './views/ResultView';
import { calculateDistance } from './services/mapCalculations';
import { GameContext } from '../../contexts/GameContext';

const Game = ({ locations }) => {
  const [markerLocation, setMarkerLocation] = useState(null);
  const [realLocation, setRealLocation] = useState(null);
  const [latLon, setLatLon] = useState({});
  const [error, setError] = useState('');
  const [locationIndex, setLocationIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGuessing, setIsGuessing] = useState(true);
  const [distance, setDistance] = useState(0);

  const { user } = usePage().props.auth;

  const handleGuess = (e) => {
    e.preventDefault();

    if (!markerLocation) {
      setError('Please place a marker before guessing!');
      return;
    }

    setScore(prev => {
      const { roundScore } = calculateDistance(latLon, locations[locationIndex]);
      return prev + roundScore;
    });
    setDistance(calculateDistance(latLon, locations[locationIndex]).distance);

    setIsGuessing(false);
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
  
  const contextValue = {
    markerLocation,
    setMarkerLocation,
    realLocation,
    setRealLocation,
    latLon,
    setLatLon,
    locationIndex,
    locations,
    error,
    score,
    setScore,
    isGuessing,
    setIsGuessing,
    distance,
    setError,

    handleGuess,
    nextLocation,
  };

  return (
    <GameContext.Provider value={contextValue}>
      <div className='h-screen relative'>
        <Link className='py-2 px-6 font-bold text-lg border-2 border-red-300 bg-red-500 rounded-xl fixed m-5 left-0 top-0 text-white z-10' href='/'>Stop</Link>
        {isGuessing ? (
          <GuessView />
        ) : (
          <ResultView />
        )}


      </div>
    </GameContext.Provider>
  )
}

Game.layout = page => page;

export default Game