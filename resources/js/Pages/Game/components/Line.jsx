import React from 'react'

const Line = ({ start, end }) => {
  const deltaX = end.xPerc - start.xPerc;
  const deltaY = (end.yPerc - start.yPerc) * 0.5;

  const length = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  const angle = Math.atan2(deltaY, deltaX);

  return (
    <div
      className="border-2 border-dashed absolute"
      style={{
        left: `${start.xPerc}%`,
        top: `${start.yPerc}%`,
        width: `${length}%`,
        transform: `rotate(${angle}rad)`,
        transformOrigin: 'left center',
      }}
    />
  );
};

export default Line