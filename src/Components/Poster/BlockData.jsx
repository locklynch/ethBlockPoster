// BlockData.jsx The window to show the block being accessed

import React, { useState, useEffect, useRef } from 'react';
import Ethereum_Logo_2014 from '../../assets/Ethereum_logo_2014.svg'

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
      <span style={{ color, overflowWrap: 'break-word' }}>{hexString}</span>
    )
  }
  return rlpObject.map((item, index) => {
    const key = `${parentKey}-${index}`
    return (
      <Rlp rlpObject={item} colorIndex={colorIndex + index} key={key} parentKey={key}></Rlp>
    )
  })
}

const BlockData = ({ blockInfo, blockChainNumberFromApp, blockPosition}) => {
  const smallBlockPosition = blockPosition
  const blockWindowRef = useRef(null)
  const blockNumberTitle = blockChainNumberFromApp
  const { decodedBlock } = blockInfo
  // block poster starting location
  const posterStartX = 130
  const posterStartY = 20
  // const scale = .253
  const scale = 0.20

  const [isDragging] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const textRef = useRef(null);

  // trying to make the box change its height depending on the length of the block info inside it, not working yet :-(
  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      setContentHeight(bbox.height)
      console.log(bbox)
    }
  }, [decodedBlock]);

  console.log('Top-left corner coordinates:', { x: smallBlockPosition.left, y: Math.abs(smallBlockPosition.top) })

  const TopLeftLine = ({ x1, y1, x2, y2}) => {
      // pulling the location of the blockdata to use in drawing a line between the small block in the chain and the blockdata block
  useEffect(() => {
    const blockWindow = blockWindowRef.current;
    if (blockWindow) {
      const blockWindowPosition = blockWindow.getBoundingClientRect()
      console.log(blockWindowPosition)
    }
  }, [blockWindowRef.current])
    return (
      <line
        x1={smallBlockPosition.left}
        y1={Math.abs(smallBlockPosition.top)}
        x2={blockWindowRef.current?.getBoundingClientRect().left || 0}
        y2={Math.abs(blockWindowRef.current?.getBoundingClientRect().top) || 0}
        style={{stroke: 'white', strokeWidth: 2}}
      />
    );
  }

  return (
    <>
        <foreignObject
          ref={blockWindowRef}
          x={posterStartX + (posterStartX / scale)}
          y={posterStartY + (posterStartY / scale)}
          width={(800) / scale}
          height={(1200) / scale}
          transform={`scale(${scale})`}
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
            border: '10px solid white',
            background: 'black'
          }}
        >
          <div xmlns="http://www.w3.org/1999/xhtml" className="block-data">
            <Rlp rlpObject={decodedBlock} />
          </div>
        </foreignObject>
        <text x={posterStartX+60} y={posterStartY+50} fill="white" fontSize="30">
          Block {blockNumberTitle}
        </text>
        <image  width='1000' height='1000' x='50' y='150' href={Ethereum_Logo_2014} opacity='20%'/>
        <TopLeftLine/>
    </>
  );
};

export default BlockData;
