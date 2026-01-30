import React from 'react'

const Marker = ({ location, styles='text-red-500' }) => {
  return (
    <div 
      className={`absolute transform -translate-x-1/2 -translate-y-7 pointer-events-none ${styles}`}
      style={{
        width: 30,
        height: 30,
        left: `${location.xPerc}%`,
        top: `${location.yPerc}%`
      }}
    >
      <svg 
        fill="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12,2C8.1,2,5,5.1,5,9c0,6,7,13,7,13s7-7.1,7-13C19,5.1,15.9,2,12,2z M12,11.5c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5 s2.5,1.1,2.5,2.5S13.4,11.5,12,11.5z"></path>
      </svg>
    </div>
  )
}

export default Marker