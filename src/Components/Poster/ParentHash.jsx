import React from 'react';
// import BlockUtils from "./BlockUtils";
import {Buffer} from 'buffer'
// import { overflowWrap } from 'html2canvas/dist/types/css/property-descriptors/overflow-wrap';

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
        transform='rotate(-25) skewX(-25)'>
          {string}
      </text>
  )
}

const ParentHash = ({blockObject}) => {
  
  const valueToHex = (value) => value === undefined ? false : Buffer.from(value).toString('hex')
  const parentHash = blockObject.header ? valueToHex(blockObject.header.parentHash) : null;
  const splitParentHashArr = splitStringAtLength(parentHash, 19)
  const tspans = createTSpans(splitParentHashArr)
  console.log('tspans:', tspans)

  return (
    <g>
      <g>
        {createSVGText(tspans[0], 200, 400)}
        {createSVGText(tspans[1], 200, 415)}
        {createSVGText(tspans[2], 200, 430)}
        {createSVGText(tspans[3], 200, 445)}
      </g>
      {/* put cube svg asset here! */}
    </g>
  )
}

export default ParentHash