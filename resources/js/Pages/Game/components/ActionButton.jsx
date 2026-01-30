import React from 'react'

const ActionButton = ({ onClick, text, color='green' }) => {
  return (
    <button 
      className='fixed bottom-0 left-1/2 transform -translate-x-1/2 py-3 px-8 text-white font-bold my-6 rounded-full text-xl italic hover:scale-105 transition hover:cursor-pointer'
      onClick={onClick}
      style={{
        backgroundColor: color
      }}
    >
      {text.toUpperCase()}
    </button>
  )
}

export default ActionButton