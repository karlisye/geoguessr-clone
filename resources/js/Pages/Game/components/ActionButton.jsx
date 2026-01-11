import React from 'react'

const ActionButton = ({ onClick, text, color='green' }) => {
  return (
    <button 
      className='fixed bottom-0 left-1/2 transform -translate-x-1/2 py-2 px-4 text-white font-bold my-2 rounded-md text-xl'
      onClick={onClick}
      style={{
        backgroundColor: color
      }}
    >
      {text}
    </button>
  )
}

export default ActionButton