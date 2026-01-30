import { Link } from '@inertiajs/react'
import React from 'react'

const Score = ({ score }) => {
  return (
    <div className='flex justify-center p-8'>
      <div className='bg-slate-900 rounded-xl'>
        <div className='flex gap-4 items-center p-6 pb-4 border-b border-slate-600'>
          <h1 className='text-4xl font-bold italic text-slate-200 text-center'>{score.user.name.toUpperCase()}S SCORE</h1>
          <Link href='/'><img className='h-10 hover:scale-105 transition hover:cursor-pointer' src="https://images.squarespace-cdn.com/content/v1/636e083394b53b69d6c3e3fb/727307c8-bdd7-40c9-945b-8adfee1cb488/logo-pin.png" alt="" /></Link>
        </div>

        <div className='mb-4 m-4'>
          <p className='text-slate-400 font-bold'>SCORE: <span className='font-normal text-slate-200'>{score.score.toFixed()} pts</span></p>
          <p className='text-slate-400 font-bold'>DATE: <span className='font-normal text-slate-200'>{new Date(score.created_at).toLocaleDateString([], {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })} {new Date(score.created_at).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric'
          })}</span></p>
        </div>

        <p className='text-slate-400 text-sm italic text-center'>THINK YOU CAN BEAT HIM?</p>
        <Link href='/play' className='flex justify-center items-center w-50 h-15 text-xl font-bold bg-linear-to-b from-green-500 to-green-800 rounded-full shadow-xl m-6 hover:scale-110 transition-all duration-200 hover:cursor-pointer mx-auto'>PLAY NOW!</Link>
      </div>
    </div>
  )
}

export default Score