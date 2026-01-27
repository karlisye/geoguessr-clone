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
      <div className='p-4'>
        <div className='flex justify-end gap-2'>
          <label className='text-slate-400' htmlFor="sortBy">Sort by</label>

          <select name="sortBy" id="sortBy" onChange={handleSortBy}>
            <option value="score">Score</option>
            <option value="user_id">Name</option>
            <option value="created_at">Time</option>
          </select>

          <select name="sort" id="sortBy" onChange={handleSort}>
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>

        <table className='w-full text-left border-separate border-spacing-y-2 table-fixed'>
          <thead>
            <tr className='bg-indigo-500/50 shadow-sm rounded-md'>
              <th className='p-2 rounded-l-lg'>Name</th>
              <th className='p-2'>Score</th>
              <th className={`p-2 ${user.role === "admin" ? '' : 'rounded-r-lg'}`}>Time</th>
              {user.role === "admin" && (
                <th className='p-2 rounded-r-lg'>Action</th>
              )}
            </tr>
          </thead>

          <tbody>
            {scores.data.map((score) => (
              <tr className='bg-indigo-400/50 shadow-sm rounded-md' key={score.id}>
                <td className='p-2 rounded-l-lg'>{score.user.name}</td>
                <td className='p-2'>{score.score.toFixed()}pts</td>
                <td className={`p-2 ${user.role === "admin" ? '' : 'rounded-r-lg'}`}>{new Date(score.created_at).toLocaleDateString([], {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })} {new Date(score.created_at).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric'
                })}</td>
                {user.role === "admin" && (
                  <td className='p-2 rounded-r-lg'>
                    <button 
                      className='bg-indigo-800/50 py-1 px-4 rounded-md'
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

      {isActive && <Modal setIsActive={setIsActive} score={selectedScore} users={users} />}
      </>
    ) : (
      <p>Loading...</p>
    )}
    </>
  )
}

export default Leaderboard