// GlobalColorPalette module for selecting the color palettes
// NOTE!! call resetColorIndex in each module to make sure it starts at 1 (because of the getColor function it'll always start at 1 instead of 0)
import { useState } from "react"

const GlobalColorPalette = () => {

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
  
  let colorIndex = 0
  
  let paletteSelector = 'neon'
  
  const setPaletteSelector = (newPalette) => {
    paletteSelector = newPalette
    console.log(paletteSelector)
  }
  
  let colorPalette = paletteOptions[paletteSelector]
  console.log(colorPalette)

  const resetColorIndex = () => {
    colorIndex = 0
  }
  
  const getColor = () => {
    colorIndex += 1
    const color = colorPalette[colorIndex % colorPalette.length]
    return color
  }

  return ({
    setPaletteSelector,
    resetColorIndex,
    getColor,
  }
    // <div>
    //   <label for="colorSelector">Select a color:</label>
    //   <select id="colorSelector" onChange={handleColorChange}>
    //     <option value="white">White</option>
    //     <option value="greys">Two Tone Grey</option>
    //     <option value="neon">Neon 90's Laser Tag</option>
    //     <option value="pastels">Pastel Clown Bois!</option>
    //   </select>
    // </div>
  )
}

export default GlobalColorPalette
