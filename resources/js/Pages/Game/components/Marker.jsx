import React from 'react'

const Marker = ({ location, color }) => {
  return (
    <div 
      className={`border-3 border-${color}-500 absolute rounded-full pointer-events-none transition-discrete transition-all duration-300`}
      style={{
        width: '20px',
        height: '20px',
        left: location.x - 10,
        top: location.y - 10,
      }}
    ></div>
  )
}

export default Marker