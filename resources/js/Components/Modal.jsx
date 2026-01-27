import { router, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'

const Modal = ({ setIsActive, score, users }) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const { data, setData, patch, delete:destroy } = useForm({
    user_id: score.user_id,
    score: score.score,
    created_at: score.created_at
  });

  const handleCloseEdit = (e) => {
    e.preventDefault();
    setIsEditActive(false);
  }

  const handleOpenEdit = (e) => {
    e.preventDefault();
    setIsEditActive(true);
  }

  const handleUpdate = (e) => {
    e.preventDefault();

    patch(`/scores/update/${score.id}`, {
      data: {
        user_id: data.user_id,
        score: data.score,
        created_at: new Date(data.created_at).toISOString()
      }
    });

    setIsEditActive(false)
  }

  const handleDelete = (e) => {
    e.preventDefault()

    destroy(`/scores/${score.id}`);
    setIsActive(false);
  }
  console.log(useForm())

  const formatForDateTimeLocal = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div 
      className='fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-10 flex items-center justify-center'
      onClick={() => setIsActive(false)}
    >
      <form 
        className='bg-indigo-400 p-4 rounded-lg flex flex-col gap-2 w-80'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex flex-col'>
          <label htmlFor="name">Name</label>
          <select 
            className='bg-white p-2 rounded-md text-black disabled:bg-slate-200 shadow-md' 
            id='name'
            disabled={!isEditActive}
            value={data.user_id}
            onChange={(e) => setData('user_id', e.target.value)}
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <label htmlFor="score">Score</label>
          <input 
            className='bg-white p-2 rounded-md text-black disabled:bg-slate-200 shadow-md' 
            id='score'
            type='number'
            disabled={!isEditActive}
            value={data.score}
            onChange={(e) => setData('score', e.target.value)}
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor="time">Time</label>
          <input 
            className='bg-white p-2 rounded-md text-black disabled:bg-slate-200 shadow-md' 
            id='time'
            type='datetime-local'
            disabled={!isEditActive}
            value={formatForDateTimeLocal(data.created_at)}
            onChange={(e) => setData('created_at', e.target.value)}
          />
        </div>

        <div className='flex gap-2'>
          <button 
            className='bg-indigo-600 py-1 px-4 rounded-md shadow-md'
            onClick={isEditActive ? handleUpdate : handleOpenEdit}
          >
            {isEditActive ? 'Save' : 'Edit'}
          </button>

          {isEditActive ? <button type='button' onClick={handleCloseEdit}>Cancel</button> :
            <button onClick={handleDelete} className='bg-red-500 py-1 px-4 rounded-md text-sm ml-auto'>Delete</button>}
        </div>
      </form>
    </div>
  )
}

export default Modal