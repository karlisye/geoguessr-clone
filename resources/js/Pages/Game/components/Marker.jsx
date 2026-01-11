import React from 'react'

const Marker = ({ location }) => {
  return (
    <div 
      className='absolute border-2 transform -translate-1/2 rounded-full border-red-500 pointer-events-none'
      style={{
        width: 20,
        height: 20,
        left: `${location.xPerc}%`,
        top: `${location.yPerc}%`
      }}
    >

    </div>
  )
}

export default Marker