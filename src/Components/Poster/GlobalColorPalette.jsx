// GlobalColorPalette module for selecting the color palettes

import { createContext } from 'react';
export const ThemeContext = createContext('startingPoint');


const paletteOptions = {
  startingPoint: [
    "#6ABD86", // some kinda seafoam
    "#997EEF", // washed out purple
    

  ],
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

  ],
  purples: [
    "#9370DB", // MediumPurple
    "#8A2BE2", // BlueViolet
    "#800080", // Purple
    "#9932CC", // DarkOrchid
    "#8B008B", // DarkMagenta
    "#9400D3", // DarkViolet
    "#6A5ACD", // SlateBlue
    "#483D8B", // DarkSlateBlue
    "#4B0082", // Indigo
    "#8E82FE"  // LightSlateBlue
  ],
  blues: [
    "#6495ED", // CornflowerBlue
    "#1E90FF", // DodgerBlue
    "#4169E1", // RoyalBlue
    "#0000FF", // Blue
    "#4682B4", // SteelBlue
    "#5F9EA0", // CadetBlue
    "#00BFFF", // DeepSkyBlue
    "#87CEEB", // SkyBlue
    "#87CEFA", // LightSkyBlue
    "#ADD8E6"  // LightBlue
  ],
  greens: [
    "#008000", // Green
    "#00FF00", // Lime
    "#32CD32", // LimeGreen
    "#008B8B", // DarkCyan
    "#006400", // DarkGreen
    "#9ACD32", // YellowGreen
    "#7FFF00", // Chartreuse
    "#7CFC00", // LawnGreen
    "#ADFF2F", // GreenYellow
    "#556B2F"  // DarkOliveGreen
  ],
  yellows: [
    "#FFFF00", // Yellow
    "#FFD700", // Gold
    "#FFA500", // Orange
    "#FF8C00", // DarkOrange
    "#FFDAB9", // PeachPuff
    "#FFE4B5", // Moccasin
    "#FFFAF0", // FloralWhite
    "#FFFACD", // LemonChiffon
    "#FAFAD2", // LightGoldenrodYellow
    "#FFEFD5"  // PapayaWhip
  ],
  oranges: [
    "#FFA500", // Orange
    "#FFD700", // Gold
    "#FF8C00", // DarkOrange
    "#FF4500", // OrangeRed
    "#D2691E", // Chocolate
    "#CD853F", // Peru
    "#8B4513", // SaddleBrown
    "#A0522D", // Sienna
    "#DEB887", // BurlyWood
    "#F4A460"  // SandyBrown
  ],
  reds: [
    "#FF0000", // Red
    "#DC143C", // Crimson
    "#FF4500", // OrangeRed
    "#B22222", // FireBrick
    "#8B0000", // DarkRed
    "#FF6347", // Tomato
    "#FF69B4", // HotPink
    "#FFC0CB", // Pink
    "#FFB6C1", // LightPink
    "#DB7093"  // PaleVioletRed
  ],
  pinks: [
    "#FFC0CB", // Pink
    "#FF69B4", // HotPink
    "#FF1493", // DeepPink
    "#DB7093", // PaleVioletRed
    "#FFB6C1", // LightPink
    "#FFA07A", // LightSalmon
    "#FA8072", // Salmon
    "#FF6347", // Tomato
    "#D87093", // MediumVioletRed
    "#C71585"  // MediumPurple
  ]
}

export const getPalette = (name) => {
  if (!paletteOptions[name]) {
    throw new Error(`no color palette "${name}"`)
  }
  return paletteOptions[name]
}

let colorPalette

const GlobalColorPalette = ({selectedPalette}) => {
  colorPalette = paletteOptions[selectedPalette]

  return colorPalette
}

GlobalColorPalette({ selectedPalette: 'startingPoint' })

let pickedColors = colorPalette

export { pickedColors }
export default GlobalColorPalette