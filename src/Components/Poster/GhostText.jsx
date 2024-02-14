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
        y={y}
        width='10'
        heigh='100'
        fill='black'
        fontFamily="monospace"
        fontSize='16'
        style={{overflowWrap: 'break-word'}}
        transform='rotate(-35) skewX(-35)'>
          {string}
      </text>
  )
}


const GhostText = ({indexString, blockObject}) => {
  const blockHeaderAsHexObj = BlockUtils({blockObject})
  const text = blockHeaderAsHexObj[indexString].value
  const splitTextArr = splitStringAtLength(text, 19)
  const tspans = createTSpans(splitTextArr)

  return (
    <g>
      {createSVGText(tspans[0], 200, 300)}
      {createSVGText(tspans[1], 200, 315)}
      {createSVGText(tspans[2], 200, 330)}
      {createSVGText(tspans[3], 200, 345)}
    </g>
  )
}

export default GhostText