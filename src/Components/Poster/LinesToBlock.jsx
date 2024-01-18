// The line that connects the top left corner of the small block in the chain to the expanded block window

import React from 'react';


const Lines = ({fromRect, toRect, posterRect}) => {
  const opacity = '50%'

  const color = 'white'
  if (!fromRect || !toRect || !posterRect) {
    return
  }

  const convertRectToRelative = (rect) => ({
    top: rect.top - posterRect.top,
    right: rect.right - posterRect.left,
    bottom: rect.bottom - posterRect.top,
    left: rect.left - posterRect.left,
  });

  const relFromRect = convertRectToRelative(fromRect)
  const relToRect = convertRectToRelative(toRect)

  // Create the polygon data to fill the space between lines
  const rightPolygonData = `
    ${relFromRect.right} ${relFromRect.top}
    ${relToRect.right} ${relToRect.top}
    ${relToRect.right} ${relToRect.bottom}
    ${relFromRect.right} ${relFromRect.bottom}
  `;

    return (
      <g>
        <polygon
          points={rightPolygonData}
          fill={color}
          opacity={opacity}
        />
        {/* <line
          id='top-left-line'
          x1={relFromRect.left}
          y1={relFromRect.top}
          x2={relToRect.left}
          y2={relToRect.top}
          stroke='white'
          strokeWidth={3}
          opacity={opacity}
        /> */}
        <line
          id='top-right-line'
          x1={relFromRect.right}
          y1={relFromRect.top}
          x2={relToRect.right}
          y2={relToRect.top}
          stroke='white'
          strokeWidth={3}
          opacity={opacity}
        />
        {/* <line
          id='bottom-left-line'
          x1={relFromRect.left}
          y1={relFromRect.bottom}
          x2={relToRect.left}
          y2={relToRect.bottom}
          stroke='white'
          strokeWidth={3}
          opacity={opacity}
        /> */}
        <line
          id='bottom-right-line'
          x1={relFromRect.right}
          y1={relFromRect.bottom}
          x2={relToRect.right}
          y2={relToRect.bottom}
          stroke='white'
          strokeWidth={3}
          opacity={opacity}
        />
      </g>
    );
  }

export default Lines