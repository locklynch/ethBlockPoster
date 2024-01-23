// The line the blockHeader from the blockData window to the blockHeader window

import React from 'react';


const TransactionLines = ({fromRect, toRect, posterRect}) => {
  const opacity = '40%'

  const color = 'white'
  if (!fromRect || !toRect || !posterRect) {
    return
  }

  const convertRectToRelative = (rect) => ({
    top: rect.top - posterRect.top,
    right: rect.right - posterRect.left + 5,
    bottom: rect.bottom - posterRect.top,
    left: rect.left - posterRect.left,
  });

  const relFromRect = convertRectToRelative(fromRect)
  const relToRect = convertRectToRelative(toRect)

  // Create the polygon data to fill the space between lines
  // const rightPolygonData = `
  //   ${relFromRect.right} ${relFromRect.top}
  //   ${relToRect.right} ${relToRect.top}
  //   ${relToRect.right} ${relToRect.bottom}
  //   ${relFromRect.right} ${relFromRect.bottom}
  // `;

  // const topPolygonData = `
  // ${relFromRect.left} ${relFromRect.bottom}
  // ${relToRect.left} ${relToRect.top}
  // ${relToRect.right} ${relToRect.top}
  // ${relFromRect.right} ${relFromRect.bottom}
  // `

  const leftPolygonData = `
  ${relFromRect.left} ${relFromRect.top}
  ${relToRect.left} ${relToRect.top}
  ${relToRect.left} ${relToRect.bottom}
  ${relFromRect.left} ${relFromRect.bottom}
  `
  const rightPolygonData = `
  ${relFromRect.right} ${relFromRect.top}
  ${relToRect.right} ${relToRect.top}
  ${relToRect.right} ${relToRect.bottom}
  ${relFromRect.right} ${relFromRect.bottom}
  `

    return (
      <g className='hidden'>
        <polygon
          points={leftPolygonData}
          fill={color}
          opacity={opacity}
        />
        {/* <polygon
          points={rightPolygonData}
          fill={color}
          opacity={opacity}
        /> */}
        <line
          id='block-data-header-bottom-line'
          x1={relFromRect.left}
          y1={relFromRect.bottom}
          x2={relFromRect.right}
          y2={relFromRect.bottom}
          stroke='white'
          strokeWidth={3}
          opacity={opacity}
        />
        <line
          id='top-left-line'
          x1={relFromRect.left}
          y1={relFromRect.top}
          x2={relToRect.left}
          y2={relToRect.top}
          stroke='white'
          strokeWidth={3}
          opacity={opacity}
        />
        {/* <line
          id='top-right-line'
          x1={relFromRect.right}
          y1={relFromRect.top}
          x2={relToRect.right}
          y2={relToRect.top}
          stroke='white'
          strokeWidth={3}
          opacity={opacity}
        /> */}
        <line
          id='bottom-left-line'
          x1={relFromRect.left}
          y1={relFromRect.bottom}
          x2={relToRect.left}
          y2={relToRect.bottom}
          stroke='white'
          strokeWidth={3}
          opacity={opacity}
        />
        {/* <line
          id='bottom-right-line'
          x1={relFromRect.right}
          y1={relFromRect.bottom}
          x2={relToRect.right}
          y2={relToRect.bottom}
          stroke='white'
          strokeWidth={3}
          opacity={opacity}
        /> */}
      </g>
    );
  }

export default TransactionLines