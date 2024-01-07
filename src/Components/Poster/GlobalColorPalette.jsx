// the module for making the color palettes
// NOTE!! call resetColorIndex in each module to make sure it starts at 0!

const colorPalette = [
    // // light colors
    // '#FFD1DC', // Light Pink
    // '#FFD700', // Light Gold
    // '#98FB98', // Mint Green
    // '#ADD8E6', // Light Blue

    // // neon colors
    // "#39FF14", // Neon Green
    // "#FF2400", // Neon Red
    // "#FF6EC7", // Neon Pink
    // "#18E3FF", // Neon Blue
    // "#FFA500", // Neon Orange
    // "#FFFF00", // Neon Yellow
    // "#B10DC9", // Neon Purple
    // "#00FFFF"  // Neon Cyan

    // grey scale
    "#888888", // medium grey 
    "#FFFFFF", // white
    "#CCCCCC", // light grey
   
  
  ];
  
let colorIndex = 0

const getColor = () => {
  colorIndex += 1
  const color = colorPalette[colorIndex % colorPalette.length]
  return color
}

const resetColorIndex = () => {
  colorIndex = 0
}

export { getColor, resetColorIndex }