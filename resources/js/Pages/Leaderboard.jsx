import { router, usePage } from '@inertiajs/react';
import React, { useState } from 'react'
import Modal from '../Components/Modal';

const Leaderboard = ({ scores, users }) => {
  const [sortBy, setSortBy] = useState('score');
  const [sort, setSort] = useState('desc');
  const [isActive, setIsActive] = useState(false);
  const [selectedScore, setSelectedScore] = useState({});

  const user = usePage().props.auth.user;

  const handleShowMore = (score) => {
    setIsActive(true);
    setSelectedScore(score);
  }

  const updateSort = (sort_by, sort) => {
    router.get('/scores', { sort_by, sort }, { preserveState:true });
  }

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
    updateSort(e.target.value, sort);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    updateSort(sortBy, e.target.value);
  }

  return (
    <>
    {scores ? (
      <>
      <div className='p-4 max-w-7xl mx-auto pt-10'>
        <div className='flex mb-4 justify-between items-center'>
          <h1 className='text-4xl font-bold italic text-slate-200'>LEADERBAORD</h1>

          <div className='space-x-4'>
            <label className='text-slate-300 font-medium self-center' htmlFor="sortBy">Sort by</label>

            <select 
              name="sortBy" 
              id="sortBy" 
              onChange={handleSortBy}
              className='bg-slate-800 text-slate-200 px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            >
              <option value="score">Score</option>
              <option value="user_id">Name</option>
              <option value="created_at">Time</option>
            </select>

            <select 
              name="sort" 
              id="sort" 
              onChange={handleSort}
              className='bg-slate-800 text-slate-200 px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            >
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>
        </div>

        <div className='overflow-hidden rounded-xl border border-slate-700 bg-slate-900'>
          <table className='w-full text-left table-fixed'>
            <thead>
              <tr className='bg-slate-800 border-b border-slate-700'>
                <th className='p-2 text-slate-200 font-semibold italic'>#</th>
                <th className='p-2 text-slate-200 font-semibold italic'>NAME</th>
                <th className='p-2 text-slate-200 font-semibold italic'>SCORE</th>
                <th className='p-2 text-slate-200 font-semibold italic'>TIME</th>
                {user.role === "admin" && (
                  <th className='p-2 text-slate-200 font-semibold'>ACTION</th>
                )}
              </tr>
            </thead>

            <tbody>
              {scores.data.map((score, index) => (
                <tr 
                  className='border-b border-slate-800 hover:bg-slate-800/50 transition-colors' 
                  key={score.id}
                >
                  <td className={`${index==0?'text-yellow-300':index==1?'text-gray-300':index==2?'text-orange-600':''} p-2`}>#{index+1}</td>
                  <td className='p-2 text-slate-300'>{score.user.name}</td>
                  <td className='p-2 text-slate-300 font-medium'>{score.score.toFixed()}pts</td>
                  <td className='p-2 text-slate-400 text-sm'>
                    {new Date(score.created_at).toLocaleDateString([], {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })} {new Date(score.created_at).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric'
                    })}
                  </td>
                  {user.role === "admin" && (
                    <td className='p-2'>
                      <button 
                        className='bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors'
                        onClick={() => handleShowMore(score)}
                      >
                        Show more
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isActive && <Modal setIsActive={setIsActive} score={selectedScore} users={users} />}
      </>
    ) : (
      <p className='text-slate-400 text-center p-8'>Loading...</p>
    )}
    </>
  )
}

export default Leaderboard
