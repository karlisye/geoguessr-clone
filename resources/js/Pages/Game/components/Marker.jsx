import React from 'react'

const Marker = ({ location, color }) => {
  return (
    <div 
      className={`border-3 border-${color}-500 absolute rounded-full transform -translate-1/2 pointer-events-none transition-discrete transition-all duration-300`}
      style={{
        width: '20px',
        height: '20px',
        left: `${location.percentX}%`,
        top: `${location.percentY}%`,
      }}
    ></div>
  )
}

export default Marker