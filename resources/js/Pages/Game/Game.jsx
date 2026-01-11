import React, { createContext, useContext, useState } from 'react'
import GuessView from './views/GuessView';
import { calcuateScore, calculateDistance, calculateLatLon } from './calculations/mapCalculations';
import ResultView from './views/ResultView';
import { router } from '@inertiajs/react';

export const GameContext = createContext(null);
export const useGame = () => useContext(GameContext);

const locations = [
  { lat:51.5074, lon:0.1278, url:'https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg?cs=srgb&dl=pexels-chaitaastic-1796715.jpg&fm=jpg' },
  { lat:12.5074, lon:-7.1278, url:'https://upload.wikimedia.org/wikipedia/commons/0/01/New_York_City_%28New_York%2C_USA%29%2C_Empire_State_Building_--_2012_--_6448.jpg' },
  { lat:34.5074, lon:89.1278, url:'https://upload.wikimedia.org/wikipedia/commons/6/66/Downtown_Oklahoma_City_skyline_at_twilight.jpg' },
  { lat:14.5074, lon:-28.1278, url:'https://cdn.britannica.com/83/195483-050-62AB0C05/Crowds-people-shopping-district-Shibuya-Japan-Tokyo.jpg' },
];

const Game = () => {
  const [guessLocation, setGuessLocation] = useState(null);
  const [isGuessing, setIsGuessing] = useState(true);
  const [locationIndex, setLocationIndex] = useState(0);

  const [score, setScore] = useState(0);

  const handleGuess = () => {
    const guessLatLon = calculateLatLon(guessLocation);

    const distance = calculateDistance(guessLatLon, locations[locationIndex]);

    const roundScore = calcuateScore(distance);
    setScore(prev => prev + roundScore);
    setIsGuessing(false);
  }

  const handleContinue = () => {
    if (!locations[locationIndex + 1]) {
      router.post('/score', { score: score });
      return;
    }

    setLocationIndex(prev => prev + 1);
    setIsGuessing(true);
    setGuessLocation(null);
  }

  return (
    <GameContext value={{guessLocation, setGuessLocation, handleGuess, handleContinue, locations, locationIndex, score}}>
      <div className='h-screen'>
        {isGuessing ? (
          <GuessView />
        ) : (
          <ResultView />
        )}
      </div>
    </GameContext>
  )
}

Game.layout = layout => layout

export default Game