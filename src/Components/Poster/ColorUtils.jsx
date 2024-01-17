// color Utility module
// NOTE!! call resetColorIndex in each module to make sure it starts at 1
// (because of the getColor function it'll always start at 1 instead of 0)

import { pickedColors } from './GlobalColorPalette'

let colorIndex = 0

const resetColorIndex = () => {
  colorIndex = 0
}

const getColor = () => {
  colorIndex += 1
  const color = pickedColors[colorIndex % pickedColors.length]
  return color
}

export { getColor, resetColorIndex }