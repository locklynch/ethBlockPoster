// BlockData.jsx The window to show the block being accessed

import React, { useState, useEffect, useRef } from 'react';
import Ethereum_Logo_2014 from '../../assets/Ethereum_logo_2014.svg'
import useResizeAndScrollEffect from './ResizeAndScrollHelper';
import EthLogo from './EthLogo';

const colorPalette = [
  '#FFD1DC', // Light Pink
  '#FFD700', // Light Gold
  '#98FB98', // Mint Green
  '#ADD8E6', // Light Blue

];


const Rlp = ({ rlpObject, colorIndex = 0, parentKey='' }) => {
  if (!Array.isArray(rlpObject)) {
    const hexString = Buffer.from(rlpObject).toString('hex')
    const color = colorPalette[colorIndex % colorPalette.length]
    return (
      <span style={{ color, overflowWrap: 'break-word'}}>{hexString}</span>
    )
  }
  return rlpObject.map((item, index) => {
    const key = `${parentKey}-${index}`
    return (
      <Rlp
        rlpObject={item}
        colorIndex={colorIndex + index}
        key={key}
        parentKey={key}
      />
    )
  })
}

const BlockData = ({ blockInfo, blockChainNumberFromApp, setBlockPosition, blockScale}) => {
  const blockNumberTitle = blockChainNumberFromApp
  const { decodedBlock } = blockInfo

  // block poster starting location
  const posterStartX = 130
  const posterStartY = 80
  
  // block scale - make this changable!!!
  let scale = blockScale
  const [isDragging] = useState(false);
  const [contentHeight, setContentHeight] = useState(1045);
  const blockDataRef = useRef(null)
  const textRef = useRef(null);

  useResizeAndScrollEffect(blockDataRef, setBlockPosition)

  useEffect(() => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setContentHeight(rect.height)
    };
  }, [blockInfo, blockScale]);

  return (
    <g
      transform={`translate(${posterStartX} ${posterStartY})`}
    >
      <rect
        width={803}
        height={contentHeight+4}
        stroke='white'
        fill='black'
        strokeWidth='2'
        fillOpacity={'70%'}
      />
      <foreignObject
        x={7}
        y={5}
        ref={blockDataRef}
        width={800/scale}
        height={contentHeight/scale}
        transform={`scale(${scale})`}
      >
        <div
          ref={textRef}
          xmlns="http://www.w3.org/1999/xhtml"
          className="block-data"
        >
          <Rlp rlpObject={decodedBlock} />
        </div>
      </foreignObject>
      <rect
        stroke='white'
        strokeWidth={'2'}
        x={265}
        y={-54}
        width={300}
        height={40}

      />
      <text
        x={270}
        y={-20}
        fill="white"
        fontSize="40"
      >
        Block {blockNumberTitle}
      </text>
      <svg
        overflow={'hidden'}
        width='600'
        height={contentHeight}
        x='100'
        y='0'
        opacity='20%'>
          <EthLogo/>
        </svg>
    </g>
  );
};

export default BlockData;
