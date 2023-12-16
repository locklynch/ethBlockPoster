import React from 'react';

const NoteLine = ({ noteFromRect, noteToRect, posterRect }) => {
  if (!noteFromRect || !noteToRect || !posterRect) {
    return null;
  }

  return (
    <g>
      <line
        id='notes-top-left-lines'
        x1={(noteFromRect.left-posterRect.left)}
        y1={(noteFromRect.top-posterRect.top)}
        x2={(noteToRect.left-posterRect.left)}
        y2={(noteToRect.top-posterRect.top+20)}
        stroke='red'
        strokeWidth={3}
        opacity={'50%'}
      />
            <line
        id='notes-top-right-line'
        x1={(noteFromRect.right-posterRect.left)}
        y1={(noteFromRect.top-posterRect.top)}
        x2={(noteToRect.right-posterRect.left)}
        y2={(noteToRect.top-posterRect.top)}
        stroke='white'
        strokeWidth={3}
        opacity={'50%'}
      />
      <line
        id='notes-bottom-left-line'
        x1={(noteFromRect.left-posterRect.left)}
        y1={(noteFromRect.bottom-posterRect.top)}
        x2={(noteToRect.left-posterRect.left)}
        y2={(noteToRect.bottom-posterRect.top)}
        stroke='white'
        strokeWidth={3}
        opacity={'50%'}
      />
      <line
        id='notes-bottom-right-line'
        x1={(noteFromRect.right-posterRect.left)}
        y1={(noteFromRect.bottom-posterRect.top)}
        x2={(noteToRect.right-posterRect.left)}
        y2={(noteToRect.bottom-posterRect.top)}
        stroke='white'
        strokeWidth={3}
        opacity={'50%'}
      />
    </g>
  )
}

export default NoteLine