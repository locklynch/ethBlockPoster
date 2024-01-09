let colorIndex = 0

const resetColorIndex = () => {
  colorIndex = 0
}

const getColor = () => {
  colorIndex += 1
  const color = colorPalette[colorIndex % colorPalette.length]
  return color
}

export { getColor, resetColorIndex}