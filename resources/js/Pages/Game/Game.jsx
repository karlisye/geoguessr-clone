import React, { createContext, useContext, useEffect, useState } from 'react'
import GuessView from './views/GuessView';
import { calcuateScore, calculateDistance, calculateLatLon } from './calculations/mapCalculations';
import ResultView from './views/ResultView';
import { router } from '@inertiajs/react';

export const GameContext = createContext(null);
export const useGame = () => useContext(GameContext);

const Game = () => {
  const [guessLocation, setGuessLocation] = useState(null);
  const [isGuessing, setIsGuessing] = useState(true);

  const [locationIndex, setLocationIndex] = useState(0);
  const [usedIndexes, setUsedIndexes] = useState([]);
  const [round, setRound] = useState(1);
  const [roundData, setRoundData] = useState([]);

  const [error, setError] = useState('');
  const [locations, setLocations] = useState({});

  const [roundScore, setRoundScore] = useState(0);
  const [roundDistance, setRoundDistance] = useState(0);

  const [score, setScore] = useState(0);

  const handleGuess = () => {
    if (!guessLocation) {
      setError('Please Select a Location Before Guessing!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const guessLatLon = calculateLatLon(guessLocation);

    const distance = calculateDistance(guessLatLon, locations[locationIndex]);
    setRoundDistance(distance);

    const currScore = calcuateScore(distance);
    setRoundScore(currScore);
    setScore(prev => prev + currScore);
    setIsGuessing(false);
  }

  const handleContinue = () => {
    if (round === 5) {
      router.post('/score', { score: score, round_data: roundData });
      return;
    }

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * locations.length);
    } while (usedIndexes.includes(newIndex) || newIndex === locationIndex);

    setUsedIndexes(prev => [...prev, locationIndex]);
    setLocationIndex(newIndex);
    setIsGuessing(true);
    setGuessLocation(null);
    setRound(prev => prev+1);
  }

  const fetchLocations = async () => {
    try {
      const res = await fetch('locations.json');
      if (!res.ok) throw new Error('Failed to fetch location data');
      const data = await res.json();
      setLocations(data);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <GameContext value={{guessLocation, setGuessLocation, handleGuess, handleContinue, locations, locationIndex, score, error, roundScore, roundDistance, round, setRoundData, roundData }}>
      <div className='h-screen bg-indigo-950'>
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