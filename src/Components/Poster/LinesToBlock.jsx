// The line that's supposed to connect the top left corner of the small block in the chain to the expanded block window

import React from 'react';


const Lines = ({fromRect, toRect, posterRect}) => {

  const color = 'white'
  if (!fromRect || !toRect || !posterRect) {
    return
  }

  const relFromRect = {
    top: (fromRect.top-posterRect.top),
    right: (fromRect.right-posterRect.left),
    bottom: (fromRect.bottom-posterRect.top),
    left: (fromRect.left-posterRect.left),

  }

  const relToRect = {
    top: (toRect.top-posterRect.top),
    right: (toRect.right-posterRect.left),
    bottom: (toRect.bottom-posterRect.top),
    left: (toRect.left-posterRect.left),
  }

  // Create the polygon data to fill the space between lines
  const polygonData = `
    ${relFromRect.right} ${relFromRect.top}
    ${relToRect.right} ${relToRect.top}
    ${relToRect.right} ${relToRect.bottom}
    ${relFromRect.right} ${relFromRect.bottom}
  `;

    return (
      <g>
        <polygon
          points={polygonData}
          fill={color}
          opacity={'30%'}
        />
        {/* <line
          id='top-left-line'
          x1={(fromRect.left-posterRect.left)}
          y1={(fromRect.top-posterRect.top)}
          x2={(toRect.left-posterRect.left)}
          y2={(toRect.top-posterRect.top)}
          stroke='white'
          strokeWidth={3}
          opacity={'50%'}
        />
        <line
          id='top-right-line'
          x1={(fromRect.right-posterRect.left)}
          y1={(fromRect.top-posterRect.top)}
          x2={(toRect.right-posterRect.left)}
          y2={(toRect.top-posterRect.top)}
          stroke='white'
          strokeWidth={3}
          opacity={'50%'}
        />
        <line
          id='bottom-left-line'
          x1={(fromRect.left-posterRect.left)}
          y1={(fromRect.bottom-posterRect.top)}
          x2={(toRect.left-posterRect.left)}
          y2={(toRect.bottom-posterRect.top)}
          stroke='white'
          strokeWidth={3}
          opacity={'50%'}
        />
        <line
          id='bottom-right-line'
          x1={(fromRect.right-posterRect.left)}
          y1={(fromRect.bottom-posterRect.top)}
          x2={(toRect.right-posterRect.left)}
          y2={(toRect.bottom-posterRect.top)}
          stroke='white'
          strokeWidth={3}
          opacity={'50%'}
        /> */}
      </g>
    );
  }

export default Lines