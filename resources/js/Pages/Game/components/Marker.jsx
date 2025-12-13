import React, { useEffect, useState } from 'react'

const Marker = ({ location, color }) => {
  const [markerSize, setMarkerSize] = useState(0);

  useEffect(() => {
    const onResize = () => setMarkerSize(window.innerWidth / 100);

    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div 
      className={`border-${color}-500 absolute rounded-full transform -translate-1/2 pointer-events-none transition-discrete transition-all duration-300`}
      style={{
        borderWidth: markerSize/5,
        width: markerSize,
        height: markerSize,
        left: `${location.percentX}%`,
        top: `${location.percentY}%`,
      }}
    ></div>
  )
}

export default Marker