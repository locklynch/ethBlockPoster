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
  return strings.map((string) => {
    return '<<tspan>${string}</tspan>>'
  })
}

const ParentHash = ({blockObject}) => {
  
  const valueToHex = (value) => value === undefined ? false : Buffer.from(value).toString('hex')
  const parentHash = blockObject.header ? valueToHex(blockObject.header.parentHash) : null;
  const splitParentHashArr = splitStringAtLength(parentHash, 10)
  const tspans = createTSpans(splitParentHashArr)
  console.log('tspans:', tspans)

  return (
    <g>
      <text
        x={50}
        y={400}
        width='50'
        heigh='100'
        fill='black'
        fontFamily="system-ui"
        fontSize='16'
        style={{overflowWrap: 'break-word'}}
        transform='rotate(-25)'>
        <tspan>12345</tspan>
        <tspan>12345</tspan>
      </text>
          </g>
  )
}

export default ParentHash