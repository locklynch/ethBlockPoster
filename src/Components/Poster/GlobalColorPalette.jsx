// the module for making the color palettes
// NOTE!! call resetColorIndex in each module to make sure it starts at 0!

const colorPalette = [
    '#FFD1DC', // Light Pink
    '#FFD700', // Light Gold
    '#98FB98', // Mint Green
    '#ADD8E6', // Light Blue
  
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