//recieve data (byte) and index (where in string of data the byte in question is)
// then return the cube svg element with color, location, and cube svg element

import getColorForByte from "./ColorPalette";
import React from "react";
import darkenColor from "./ColorDarkenerUtil"

//somehow add that color value to the fill of each cube in the layer

const makePath = (...points) => {
  return `M${points.map(([x,y]) => `${x} ${y}`).join('L')}Z`
}

const centerBottomCube = (color) => {
  return drawCube(0, 0, color, true, true, true)
}
const drawCube = (x, y, color, drawTop, drawRight, drawLeft) => {
  const topFace = {
    left: [0, 10.78],
    top: [15.83, 0.11],
    right: [31.68, 10.78],
    bottom: [15.83, 21.25],
  }
  const rightFace = {
    bottomRight: [31.68, 30.42],
    topRight: [31.68, 14.57],
    bottomLeft: [15.86, 41],
    topLeft: [15.86, 25],
  }
  const leftFace = {
    bottomLeft: [0, 30.5],
    topLeft: [0.0263232, 14.6515],
    topRight: [15.86, 25.1149],
    bottomRight: [15.86, 41.1721],
  }
  return (
    <svg
      width="32"
      height="42"
      viewBox="0 0 32 42"
      x={484 + x}
      y={500 + y}
      opacity="100%"
    >
      <g>
      <g>
        <rect width="32" height="42" fill="none"/>
        <g>
        <path d={makePath(
              topFace.left,
              topFace.top,
              topFace.right,
              rightFace.bottomRight,
              rightFace.bottomLeft,
              leftFace.bottomLeft,
        )} fill={"purple"}/>
        {drawTop && <path d={makePath(
              topFace.left,
              topFace.top,
              topFace.right,
              topFace.bottom,
        )} fill={color}/>}
        {drawRight && <path d={makePath(
              rightFace.topLeft,
              rightFace.topRight,
              rightFace.bottomRight,
              rightFace.bottomLeft,
        )} fill={color}/>}
        {drawLeft && <path d={makePath(
              leftFace.topLeft,
              leftFace.topRight,
              leftFace.bottomRight,
              leftFace.bottomLeft,
        )} fill={color}/>}
        </g>
        </g>
      </g>
    </svg>
  )
}

const leftCube = (x, y, color) => {
  return drawCube(x,y,color,true,false,true)
}

const rightCube = (x, y, color) => {
  return drawCube(x,y,color,true,true,false)
}

const topsOnly = (x, y, x1, y1, color) => {
  return drawCube(x+x1,y+y1,color,true,false,false)
}

function uint8ArrayToBitArray(uInt8Array) {
  const bitArray = [];
  const byteArray = Array.from(uInt8Array)
  for (let byte of byteArray) {
      for (let i = 7; i >= 0; i--) {
          const bit = (byte >> i) & 1;
          bitArray.push(bit);
      }
  }
  return bitArray;
}

const CubeLayerBytesPlane = ({data, saturationModifier}) => {
  const drawCube = (bit, index) => {
    const color = (bit ? '#000000' : '#FFFFFF')
    const x = index % 16
    const y = Math.floor(index / 16)

    if (index === 0) {
      return centerBottomCube(color, saturationModifier)
    }
    if (x === 0) {
      return rightCube((y * 19), (y * -12), color, saturationModifier)
    }
    if (y === 0) {
      return leftCube((x * -19), (x * -12), color, saturationModifier)
    }
    return topsOnly((-19 * x), (-12 * x), (19 * y), (-12 * y), color, saturationModifier)
  }
  const bitArray = uint8ArrayToBitArray(data)

  return (
    <>
      {...bitArray.map((entry, index) => {
        const reversedIndex = (bitArray.length - 1) - index
        return drawCube(entry, reversedIndex)
      })}
    </>
  )
}

export default CubeLayerBytesPlane


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