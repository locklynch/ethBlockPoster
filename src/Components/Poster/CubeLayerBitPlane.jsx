//recieve data (byte) and index (where in string of data the byte in question is)
// then return the cube svg element with color, location, and cube svg element

import getColorForByte from "./ColorPalette";
import React from "react";

//somehow add that color value to the fill of each cube in the layer

const centerBottomCube = (color) => {
  return (
    <svg
      viewBox="0 0 256 417"
      width="320"
      height="420"
      x="452.5"
      y="500"
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

const leftCube = (x, y, color) => {
  return (
    <svg
      width="32"
      height="42"
      viewBox="0 0 32 42"
      x={484 + x}
      y={500 + y}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_16_31)">
        <rect width="32" height="42" fill="none"/>
        <g clipPath="url(#clip1_16_31)">
          <path d="M0.0263672 10.7819L15.8598 21.2454L31.68 10.7819L15.8598 0.10788L0.0263672 10.7819Z" fill={color}/>
          <path d="M0 30.4191L0.0263232 14.5725L15.8597 25.036L15.8203 41.0932L0 30.4191Z" fill={color}/>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_16_31">
          <rect width="32" height="42" fill="white"/>
        </clipPath>
        <clipPath id="clip1_16_31">
          <rect width="31.68" height="41.28" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

const rightCube = (x, y, color) => {
  return (
    <svg width="32"
      height="42"
      viewBox="0 0 32 42"
      x={484 + x}
      y={500 + y}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_16_35)">
        <rect width="32" height="42" fill="none"/>
        <g clipPath="url(#clip1_16_35)">
          <path d="M31.6537 10.7819L15.8334 21.2454L0 10.7819L15.8334 0.10788L31.6537 10.7819Z" fill={color}/>
          <path d="M31.68 30.4191L31.6536 14.5725L15.8334 25.036L15.8597 41.0932L31.68 30.4191Z" fill={color}/>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_16_35">
          <rect width="32" height="42" fill="white"/>
        </clipPath>
        <clipPath id="clip1_16_35">
          <rect width="31.68" height="41.28" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

const topsOnly = (x, y, x1, y1, color) => {
  return (
    <svg
      width="32"
      height="42"
      viewBox="0 0 32 42"
      x={484 + x + x1}
      y={500 + y + y1}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_16_39)">
        <rect width="32" height="42" fill="none"/>
        <g clipPath="url(#clip1_16_39)">
          <path d="M31.6537 10.7819L15.8334 21.2454L0 10.7819L15.8334 0.10788L31.6537 10.7819Z" fill={color}/>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_16_39">
          <rect width="32" height="42" fill="white"/>
        </clipPath>
        <clipPath id="clip1_16_39">
          <rect width="31.68" height="41.28" fill="white"/>
        </clipPath>
      </defs>
    </svg>

  )
}

function uint8ArrayToBitArray(uInt8Array) {
  const bitArray = [];
  for (let byte of uInt8Array) {
      for (let i = 7; i >= 0; i--) {
          const bit = (byte >> i) & 1;
          bitArray.push(bit);
      }
  }
  return bitArray;
}

const CubeLayerBitPlane = ({data}) => {
  const drawCube = (bit, index) => {
    const color = (bit ? '#000000' : '#FFFFFF')
    const x = index % 16
    const y = Math.floor(index / 16)

    if (index === 0) {
      return centerBottomCube(color)
    }
    if (y === 0) {
      return rightCube((x * 19), (x * -12), color)
    }
    if (x === 0) {
      return leftCube((y * -19), (y * -12), color)
    }
    return topsOnly((-19 * x), (-12 * x), (19 * y), (-12 * y), color)
  }

  return (
    <>
      {...uint8ArrayToBitArray(data).map(drawCube)}
    </>
  )
}

export default CubeLayerBitPlane


  // const drawtheCube = (byte, index) => {
  //   //take byte and convert to x and y coordinates for palette lookup
  //   const splitByteIntoPaletteLocation = ({byte}) => {
  //     const [xStr, yStr] = byte.split('')
  //     const PaletteX = parseInt(xStr, 16)
  //     const PaletteY = parseInt(yStr, 16)
  //     return PaletteX, PaletteY
  //    }
  // }

  // colorPalette()
  //     console.log('colorsArr:', colorsArr)

  //do other things here