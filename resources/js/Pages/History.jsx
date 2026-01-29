import { usePage } from '@inertiajs/react'
import React from 'react'

const History = ({ scores }) => {
  const user = usePage().props.auth.user;
  console.log(scores)
  return (
    <div className='flex flex-col items-center'>
      <div>
        <h1 className='text-3xl  font-bold italic mt-6 mb-3 text-slate-300'>{user.name}s History</h1>

        <div className='rounded-xl border-gray-600 bg-slate-950 p-6 w-200'>
          <div className='border border-gray-600 rounded-lg overflow-hidden'>
            <table className='w-full text-slate-100'>
              <thead>
                <tr className='border-b border-gray-600'>
                  <th className='text-left p-2 bg-gray-900'>#</th>
                  <th className='text-left p-2 bg-gray-900'>Score</th>
                  <th className='text-left p-2 bg-gray-900'>Date</th>
                  <th className='text-left p-2 bg-gray-900'></th>
                </tr>
              </thead>

              <tbody>
                {scores.map((score, index) => (
                  <tr className='border-b border-gray-600' key={score.id}>
                    {/* <td className={`${index==0?'text-yellow-300':index==1?'text-gray-300':index==2?'text-orange-800':''} p-2`}>#{index+1}</td> */}
                    <td className='p-2 bg-slate-800'>{index+1}</td>
                    <td className='p-2 bg-slate-800'>{score.score.toFixed(2)}</td>
                    <td className='p-2 bg-slate-800'>{new Date(score.created_at).toLocaleDateString([], {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })} {new Date(score.created_at).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric'
                    })}</td>
                    <td className='p-2 bg-slate-800 underline hover:cursor-pointer'>Share</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default History