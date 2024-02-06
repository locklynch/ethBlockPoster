import React from 'react';
// import BlockUtils from "./BlockUtils";
import {Buffer} from 'buffer'
// import { overflowWrap } from 'html2canvas/dist/types/css/property-descriptors/overflow-wrap';
import BlockUtils from './BlockUtils';
import FullCubeLayer from './FullCubeLayer';

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

//function to find the length of the blockHeader in bytes
const countBytesInBlockHeader = ({blockObject}) => {
  const posExecutionBlockHeader = BlockUtils({blockObject})
  const keyToExtract = 'value'
  const arrOfValues = Object.values(posExecutionBlockHeader).map(obj => obj[keyToExtract])
  const stringOfValues = arrOfValues.join('')
  return stringOfValues.length / 2
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

const ParentHash = ({blockObject}) => {
  
  const valueToHex = (value) => value === undefined ? false : Buffer.from(value).toString('hex')
  const parentHash = blockObject.header ? valueToHex(blockObject.header.parentHash) : null;
  const splitParentHashArr = splitStringAtLength(parentHash, 19)
  const tspans = createTSpans(splitParentHashArr)
  const headerByteLength = countBytesInBlockHeader({blockObject})
  console.log('tspans:', tspans)
  console.log('headerByteLength:', headerByteLength)

  return (
    <g>
      <g>
        {createSVGText(tspans[0], 200, 300)}
        {createSVGText(tspans[1], 200, 315)}
        {createSVGText(tspans[2], 200, 330)}
        {createSVGText(tspans[3], 200, 345)}
      </g>
      <FullCubeLayer/>
      <text
        x={700}
        y={735}
        fill='black'
        transform='rotate(-35) skewX(-30)'
      >
        .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  parentHash
      </text>
    </g>
  )
}

export default ParentHash