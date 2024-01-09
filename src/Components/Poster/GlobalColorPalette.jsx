// GlobalColorPalette module for selecting the color palettes
// NOTE!! call resetColorIndex in each module to make sure it starts at 1 (because of the getColor function it'll always start at 1 instead of 0)
// import React, { useState, useEffect, useRef } from 'react';
// import Poster from "./Poster"

const GlobalColorPalette = () => {

  let selectedPalette = 'neon'

  const paletteOptions = {
    white: [
      "#FFFFFF" // white
    ],
    greys: [
      "#BBBBBB", // medium grey 
      "#FFFFFF", // white
    ],
    neon: [
      "#FF6EC7", // Neon Pink
      "#39FF14", // Neon Green
      "#FF2400", // Neon Red
      "#18E3FF", // Neon Blue
      "#FFA500", // Neon Orange
      "#FFFF00", // Neon Yellow
      "#B10DC9", // Neon Purple
      "#00FFFF"  // Neon Cyan
    ],
    pastels: [
      '#FFD1DC', // Light Pink
      '#FFD700', // Light Gold
      '#98FB98', // Mint Green
      '#ADD8E6', // Light Blue
  
    ]
  }
  
  // let colorIndex = 0
  
  let colorPalette = paletteOptions[selectedPalette]
  console.log(colorPalette)

  // const resetColorIndex = () => {
  //   colorIndex = 0
  // }
  
  // const getColor = () => {
  //   colorIndex += 1
  //   const color = colorPalette[colorIndex % colorPalette.length]
  //   return color
  // }

  return null
  // {
    // setPaletteSelector,
    // resetColorIndex,
    // getColor,
  // }
}

export default GlobalColorPalette
// export { GlobalColorPalette, getColor, resetColorIndex };