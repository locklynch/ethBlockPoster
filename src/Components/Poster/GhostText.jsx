import React from "react";
import BlockUtils from "./BlockUtils";

const splitStringAtLength = (inputString, length) => {
  let result = []
  for (let i = 0; i < inputString.length; i += length) {
    result.push(inputString.substr(i, length))
  }
  return result
}

const createTSpans = (strings) => {
  return strings.map((string, index) => {
    return <tspan key={index}>{string}</tspan>
  })
}

const createSVGText = (string, x, y) => {
  return (
    <text
        x={x}
        y={y+30}
        width='10'
        heigh='100'
        fill='black'
        fontFamily="monospace"
        fontSize='16'
        opacity={'50%'}
        style={{overflowWrap: 'break-word'}}
        transform='rotate(-35) skewX(-35)'>
          {string}
      </text>
  )
}


const GhostText = ({indexString, blockObject}) => {
  const blockHeaderAsHexObj = BlockUtils({blockObject})
  const text = blockHeaderAsHexObj[indexString].value
  const splitTextArr = splitStringAtLength(text, 40)
  const tspans = createTSpans(splitTextArr)

  return (
    <g>
      {createSVGText(tspans[0], 220, 510)}
      {createSVGText(tspans[1], 220, 525)}
      {createSVGText(tspans[2], 220, 540)}
      {createSVGText(tspans[3], 220, 555)}
      {createSVGText(tspans[4], 220, 570)}
      {createSVGText(tspans[5], 220, 585)}
      {createSVGText(tspans[6], 220, 600)}
      {createSVGText(tspans[7], 220, 615)}
      {createSVGText(tspans[8], 220, 630)}
      {createSVGText(tspans[9], 220, 645)}
      {createSVGText(tspans[10], 220, 660)}
      {createSVGText(tspans[11], 220, 675)}
      {createSVGText(tspans[12], 220, 690)}
      {createSVGText(tspans[13], 220, 705)}
      {createSVGText(tspans[14], 220, 720)}
      {createSVGText(tspans[15], 220, 735)}
      {createSVGText(tspans[16], 220, 750)}
      {createSVGText(tspans[17], 220, 765)}
      {createSVGText(tspans[18], 220, 780)}
      {createSVGText(tspans[19], 220, 795)}
      {createSVGText(tspans[20], 220, 810)}
    </g>
  )
}

export default GhostText