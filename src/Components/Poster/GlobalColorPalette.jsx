// GlobalColorPalette module for selecting the color palettes

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

let colorPalette

const GlobalColorPalette = ({selectedPalette}) => {
  colorPalette = paletteOptions[selectedPalette]

  return colorPalette
}

GlobalColorPalette({ selectedPalette: 'neon' })

let pickedColors = colorPalette

export { pickedColors }
export default GlobalColorPalette