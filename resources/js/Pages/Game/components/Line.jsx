import React, { useEffect, useState } from 'react'

const Line = ({ start, end }) => {
    const [lineSize, setLineSize] = useState(0);
    useEffect(() => {
        const onResize = () => setLineSize(window.innerWidth / 1000);

        onResize();
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);
  return (
    <div
        className='absolute pointer-events-none border-dashed border-red-500'
        style={{
            left: `${start.percentX}%`,
            top: `${start.percentY}%`,
            width: Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)),
            borderWidth: lineSize,
            transformOrigin: 'left center',
            transform: `rotate(${Math.atan2(end.y - start.y, end.x - start.x)}rad)`,
        }}
    ></div>
  )
}

export default Line