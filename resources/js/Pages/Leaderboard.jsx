import React from 'react'

const Leaderboard = ({ scores }) => {
  console.log(scores)
  return (
    <>
        <div>
            {scores.data.map((score, key) => (
                <div key={score.id} className='bg-gray-300 m-2 p-2 rounded-md flex'>
                    <span className='w-full'>{key+=1}</span>
                    <span className='w-full'>{score.user.name}</span>
                    <span className='w-full'>{score.score}pts</span>
                    <span className='w-full'>{new Date(score.created_at).toLocaleString()}</span>
                </div>
            ))}
        </div>
    </>
  )
}

export default Leaderboard