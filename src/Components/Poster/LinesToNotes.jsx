import React from 'react';

const NoteLine = ({ noteFromRect, noteToRect, posterRect, color }) => {
  if (!noteFromRect || !noteToRect || !posterRect) {
    return null;
  }

  const relFromRect = {
    top: (noteFromRect.top-posterRect.top),
    right: (noteFromRect.right-posterRect.left),
    bottom: (noteFromRect.bottom-posterRect.top),
    left: (noteFromRect.left-posterRect.left),

  }

  const relToRect = {
    top: (noteToRect.top-posterRect.top),
    right: (noteToRect.right-posterRect.left),
    bottom: (noteToRect.bottom-posterRect.top),
    left: (noteToRect.left-posterRect.left),
  }

  // Create the polygon data to fill the space between lines
  const polygonData = `
    ${relFromRect.left} ${relFromRect.top}
    ${relToRect.left} ${relToRect.top}
    ${relToRect.right} ${relToRect.bottom}
    ${relFromRect.right} ${relFromRect.bottom}
  `;


  return (
    <g>
      
      <polygon
        points={polygonData}
        fill={color}
        opacity={'20%'}
      />
    </g>
  )
}

export default NoteLine