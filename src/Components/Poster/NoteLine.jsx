import React from 'react';

const NoteLine = ({ noteFromRect, noteToRect, posterRect }) => {
  if (!noteFromRect || !noteToRect || !posterRect) {
    return
  }

  return (
    <g>
      <line
        id='notes-layer-lines'
        x1={(noteFromRect.left-posterRect.left)}
        y1={(noteFromRect.top-posterRect.top)}
        x2={(noteToRect.left-posterRect.left)}
        y2={(noteToRect.top-posterRect.top)}
        stroke='red'
        strokeWidth={3}
        opacity={'50%'}
      />
    </g>
  )
}

export default NoteLine