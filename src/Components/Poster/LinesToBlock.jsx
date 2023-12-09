// The line that's supposed to connect the top left corner of the small block in the chain to the expanded block window

import React from 'react';


const Lines = ({fromRect, toRect, posterRect}) => {
  // console.log((fromRect))
  if (!fromRect || !toRect || !posterRect) {
    return
  }
    // console.log('fromRect:', fromRect.bottom)
    // console.log('toRect:', toRect)
    // console.log('posterRect', posterRect.bottom)
    return (
      <g>
        <line
          id='top-left-line'
          x1={(fromRect.left-posterRect.left)}
          y1={(fromRect.top-posterRect.top)}
          x2={(toRect.left-posterRect.left)}
          y2={(toRect.top-posterRect.top)}
          stroke='white'
          strokeWidth={2}
        />
        <line
          id='top-right-line'
          x1={(fromRect.right-posterRect.left)}
          y1={(fromRect.top-posterRect.top)}
          x2={(toRect.right-posterRect.left)}
          y2={(toRect.top-posterRect.top)}
          stroke='white'
          strokeWidth={2}
        />
        <line
          id='bottom-left-line'
          x1={(fromRect.left-posterRect.left)}
          y1={(fromRect.bottom-posterRect.top)}
          x2={(toRect.left-posterRect.left)}
          y2={(toRect.bottom-posterRect.top)}
          stroke='white'
          strokeWidth={2}
        />
        <line
          id='bottom-right-line'
          x1={(fromRect.right-posterRect.left)}
          y1={(fromRect.bottom-posterRect.top)}
          x2={(toRect.right-posterRect.left)}
          y2={(toRect.bottom-posterRect.top)}
          stroke='white'
          strokeWidth={2}
        />
      </g>
    );
  }

export default Lines