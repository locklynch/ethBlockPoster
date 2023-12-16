import React from 'react';

const NoteLine = ({ noteFromRect, noteToRect, posterRect }) => {
  if (!noteFromRect || !noteToRect || !posterRect) {
    return null;
  }

  const color = 'white'

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

  // const controlPointXL = (relFromRect.left + relToRect.left)/1.3;
  // const controlPointXR = (relFromRect.left + relToRect.right)/2;
  // const controlPointYT = (relFromRect.top + relToRect.top) /2;
  // const controlPointYB = (relFromRect.bottom + relToRect.bottom) /2;

  // // Create the path data for the cubic Bezier curve
  // const pathDataTL = `
  //   M ${relFromRect.left} ${relFromRect.top}
  //   C ${controlPointXL}
  //     ${controlPointYT} 
  //     ${controlPointXL}
  //     ${controlPointYT}
  //     ${relToRect.left}
  //     ${relToRect.top}
  // `;

  // const pathDataTR = `
  // M ${relFromRect.right} ${relFromRect.top}
  // C ${controlPointXR}
  //   ${controlPointYT} 
  //   ${controlPointXR}
  //   ${controlPointYT}
  //   ${relToRect.right}
  //   ${relToRect.top}
  // `;

  // const pathDataBL = `
  // M ${relFromRect.left} ${relFromRect.bottom}
  // C ${controlPointXL}
  //   ${controlPointYB} 
  //   ${controlPointXL}
  //   ${controlPointYB}
  //   ${relToRect.left}
  //   ${relToRect.bottom}
  // `;

  // const pathDataBR = `
  // M ${relFromRect.right} ${relFromRect.bottom}
  // C ${controlPointXR}
  //   ${controlPointYB} 
  //   ${controlPointXR}
  //   ${controlPointYB}
  //   ${relToRect.right}
  //   ${relToRect.bottom}
  // `;

  // Create the polygon data to fill the space between lines
  const polygonData = `
    ${relFromRect.left} ${relFromRect.top}
    ${relToRect.left} ${relToRect.top}
    ${relToRect.right} ${relToRect.bottom}
    ${relFromRect.right} ${relFromRect.bottom}
  `;


  return (
    <g>
      {/* <path
        id='notes-top-left-lines'
        d={pathDataTL}
        stroke={color}
        strokeWidth={3}
        fill='transparent'
        opacity={'50%'}
      />
      <path
        id='notes-top-right-lines'
        d={pathDataTR}
        stroke={color}
        strokeWidth={3}
        fill='transparent'
        opacity={'50%'}
      />
      <path
        id='notes-bottom-left-lines'
        d={pathDataBL}
        stroke={color}
        strokeWidth={3}
        fill='transparent'
        opacity={'50%'}
      />
      <path
        id='notes-bottom-right-lines'
        d={pathDataBR}
        stroke={color}
        strokeWidth={3}
        fill='transparent'
        opacity={'50%'}
      /> */}
      <polygon
        points={polygonData}
        fill={color}
        opacity={'20%'}
      />
      {/* <line
        id='notes-lines'
        x1={(relFromRect.left)}
        y1={(relFromRect.top)}
        x2={((relToRect.left+relToRect.right)/2)}
        y2={((relToRect.top+relToRect.bottom)/2)}
        stroke={color}
        strokeWidth={3}
        fill='transparent'
        opacity={'20%'}
      />
      <line
        id='notes-top-right-line'
        x1={(noteFromRect.right-posterRect.left)}
        y1={(noteFromRect.top-posterRect.top)}
        x2={(noteToRect.right-posterRect.left)}
        y2={(noteToRect.top-posterRect.top)}
        stroke={color}
        strokeWidth={3}
        opacity={'20%'}
      />
      <line
        id='notes-bottom-left-line'
        x1={(noteFromRect.left-posterRect.left)}
        y1={(noteFromRect.bottom-posterRect.top)}
        x2={(noteToRect.left-posterRect.left)}
        y2={(noteToRect.bottom-posterRect.top)}
        stroke={color}
        strokeWidth={3}
        opacity={'20%'}
      />
      <line
        id='notes-bottom-right-line'
        x1={(noteFromRect.right-posterRect.left)}
        y1={(noteFromRect.bottom-posterRect.top)}
        x2={(noteToRect.right-posterRect.left)}
        y2={(noteToRect.bottom-posterRect.top)}
        stroke={color}
        strokeWidth={3}
        opacity={'20%'}
      /> */}
    </g>
  )
}

export default NoteLine