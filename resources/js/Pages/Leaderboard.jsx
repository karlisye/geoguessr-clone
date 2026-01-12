import { router } from '@inertiajs/react';
import React, { useState } from 'react'

const Leaderboard = ({ scores }) => {
  const [sortBy, setSortBy] = useState('score');
  const [sort, setSort] = useState('desc');

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
      <div className='m-4'>
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
            <tr className='bg-slate-200 shadow-sm rounded-md'>
              <th className='p-2 rounded-l-lg'>Name</th>
              <th className='p-2'>Score</th>
              <th className='p-2 rounded-r-lg'>Time</th>
            </tr>
          </thead>

          <tbody>
            {scores.data.map((score) => (
              <tr className='bg-slate-200 shadow-sm rounded-md' key={score.id}>
                <td className='p-2 rounded-l-lg'>{score.user.name}</td>
                <td className='p-2'>{score.score}pts</td>
                <td className='p-2 rounded-r-lg'>{new Date(score.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    ) : (
      <p>Loading...</p>
    )}
    </>
  )
}

export default Leaderboard