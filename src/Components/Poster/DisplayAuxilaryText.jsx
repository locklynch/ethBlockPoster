import React from "react";
// import { centerBottomCube } from "./CubeLayerBytesPlane";

const centerBottomCube = (x, y, color) => {
  return (
    <svg
      viewBox="0 0 256 417"
      width="320"
      height="420"
      x={x}
      y={y}
      opacity="100%"
    >
      <g>
      <g clipPath="url(#clip0_16_27)">
        <rect width="32" height="42" fill="none"/>
        <g clipPath="url(#clip1_16_27)">
        <path d="M31.6537 10.7819L15.8334 21.2454L0 10.7819L15.8334 0.10788L31.6537 10.7819Z" fill={color}/>
        <path d="M31.68 30.4191L31.6536 14.5725L15.8334 25.036L15.8597 41.0932L31.68 30.4191Z" fill={color}/>
        <path d="M0 30.498L0.0263232 14.6515L15.3333 24.7727L15.8597 25.1149L15.8203 41.1721L0 30.498Z" fill={color}/>
        </g>
        </g>
        <defs>
        <clipPath id="clip0_16_27">
        <rect width="32" height="42" fill="white"/>
        </clipPath>
        <clipPath id="clip1_16_27">
        <rect width="31.68" height="41.28" fill="white"/>
        </clipPath>
        </defs>
      </g>
    </svg>
  )
}

const AuxilaryInfo = ({blockChainNumberFromInputs}) => {

  const displayBlockText = (x, y) => {
    return (
      <g>
        <text
          x={x}
          y={y}
          width='10'
          heigh='100'
          fill='black'
          fontFamily="monospace"
          fontSize='100'
          opacity={'100%'}
          style={{overflowWrap: 'break-word'}}
          transform='rotate(-35) skewX(-35)'>
            Block
        </text>
      </g>
    )
  }

  const displayBlockNumber = (x, y, number) => {
    return (
      <g>
        <text
          x={x}
          y={y}
          width='10'
          heigh='100'
          fill='black'
          fontFamily="monospace"
          fontSize='90'
          opacity={'100%'}
          style={{overflowWrap: 'break-word'}}
          transform='rotate(-35) skewX(-35)'>
            {number}
        </text>
      </g>
    )
  }

  const displayKey = (x, y) => {
    // const cubeKeySVG = centerBottomCube from CubeLayerBytesPlane
    return (
      <g>
        <text
          x={x}
          y={y}
          width='10'
          heigh='100'
          fill='black'
          fontFamily="monospace"
          fontSize='20'
          opacity={'100%'}
          style={{overflowWrap: 'break-word'}}
          transform='rotate(-35) skewX(-35)'>
            1 byte
        </text>
      </g>
    )
  }

  return (
    //key (1 cube = 1 byte)
    //Mass Market Logo
    <g>
      {displayBlockText(120, 800)}
      {displayBlockNumber(750, 1000, blockChainNumberFromInputs)}
      {centerBottomCube(30, 1400, '#000000')}
      {displayKey(120, 1215)}
    </g>
  )
}

export default AuxilaryInfo