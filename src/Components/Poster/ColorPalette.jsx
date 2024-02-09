import React from "react";

const colorPaletteGenerator = () => {
  const programaticColorPalette = () => {
    const makeColorHexs = () => {
      //MAKE STRINGS OF 6 HEX LENGTH FOR COLORS OF PROGRAMATICALLY PRODUCED COLORS
    }
    
    const colorsArr = []

    for (let i = 0; i < 16; i++) {
      const row = []
      for (let j = 0; j < 16; j++) {
        row.push(makeColorHexs())
      }
      colorsArr.push(row)
    }
    return colorsArr
  }
  return programaticColorPalette()
}

const manualColorPalette = () => {
  return colorsArr = [
    ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ff8000', '#8000ff', '#0080ff', '#ff0080', '#80ff00', '#800000', '#008000', '#000080', '#808000', '#800080'],
    ['#ff00ff', '#8000ff', '#ff00ff', '#00ffff', '#ff00ff', '#0080ff', '#008000', '#00ffff', '#ff00ff', '#0000ff', '#ff0080', '#008000', '#ff00ff', '#ff8000', '#0080ff', '#ff0000'],
    ['#ffff00', '#00ff00', '#800080', '#8000ff', '#ff8000', '#0080ff', '#008000', '#ff00ff', '#008000', '#ff8000', '#800080', '#ff0000', '#ffff00', '#00ff00', '#8000ff', '#800080'],
    ['#ff00ff', '#0080ff', '#ff0080', '#00ff00', '#8000ff', '#ff0000', '#008000', '#800000', '#0080ff', '#8000ff', '#ff00ff', '#008000', '#ff8000', '#800080', '#ffff00', '#800000'],
    ['#ffff00', '#8000ff', '#00ff00', '#ff8000', '#8000ff', '#00ff00', '#800080', '#ff0000', '#ffff00', '#800080', '#ffff00', '#ff00ff', '#ff0000', '#00ff00', '#ff0080', '#0080ff'],
    ['#ff8000', '#8000ff', '#ff00ff', '#ff00ff', '#ffff00', '#00ff00', '#ff0080', '#ff00ff', '#ff00ff', '#8000ff', '#ffff00', '#ff00ff', '#800000', '#ffff00', '#ff8000', '#8000ff'],
    ['#800080', '#ff00ff', '#ff8000', '#ff0000', '#ff0000', '#ff00ff', '#00ffff', '#8000ff', '#ffff00', '#ff0000', '#ffff00', '#ff0000', '#ff00ff', '#ff8000', '#00ff00', '#ff0000'],
    ['#00ff00', '#800080', '#ff0000', '#00ffff', '#8000ff', '#ffff00', '#8000ff', '#ffff00', '#ffff00', '#ff8000', '#800080', '#800080', '#800080', '#ff00ff', '#00ffff', '#ff8000'],
    ['#ffff00', '#ff00ff', '#00ffff', '#ff8000', '#ffff00', '#ff8000', '#800080', '#00ff00', '#ffff00', '#00ff00', '#ff00ff', '#8000ff', '#ffff00', '#ff8000', '#ff8000', '#00ffff'],
    ['#00ffff', '#00ffff', '#00ffff', '#ffff00', '#00ff00', '#ffff00', '#8000ff', '#ff8000', '#8000ff', '#ff8000', '#ff00ff', '#00ff00', '#00ffff', '#ff00ff', '#800080', '#00ff00'],
    ['#ff00ff', '#ffff00', '#ff8000', '#ffff00', '#ffff00', '#ff8000', '#ff00ff', '#00ffff', '#ff00ff', '#00ffff', '#ff8000', '#ff0000', '#00ffff', '#ff8000', '#00ff00', '#800080'],
    ['#00ff00', '#ff00ff', '#8000ff', '#00ff00', '#00ffff', '#ff00ff', '#ffff00', '#ff0000', '#800080', '#ffff00', '#ff0000', '#ffff00', '#00ff00', '#ffff00', '#ff00ff', '#ffff00'],
    ['#8000ff', '#ffff00', '#00ffff', '#ffff00', '#ffff00', '#ffff00', '#8000ff', '#00ff00', '#8000ff', '#ff8000', '#00ffff', '#8000ff', '#ff00ff', '#ff0000', '#800080', '#00ff00'],
    ['#ffff00', '#00ff00', '#00ff00', '#8000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff00ff', '#8000ff', '#00ffff', '#ff00ff', '#ff00ff', '#ff8000', '#00ffff', '#ff00ff', '#ffff00'],
    ['#800080', '#00ffff', '#00ffff', '#ffff00', '#ff00ff', '#00ffff', '#00ffff', '#ffff00', '#00ffff', '#ff00ff', '#ff8000', '#800080', '#00ff00', '#ffff00', '#8000ff', '#ffff00'],
    ['#00ffff', '#00ffff', '#ff8000', '#00ff00', '#ffff00', '#00ffff', '#800080', '#00ff00', '#ff8000', '#ffff00', '#00ff00', '#800080', '#ff8000', '#00ffff', '#ff00ff', '#800080']
  ]  
}

const colorPalette = ({}) => {
  
}

export default colorPalette