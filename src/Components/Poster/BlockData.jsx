// BlockData.jsx The window to show the block being accessed

import React, { useState, useEffect, useRef } from 'react';
import Ethereum_Logo_2014 from '../../assets/Ethereum_logo_2014.svg'

const colorPalette = [
  '#FFD1DC', // Light Pink
  '#FFD700', // Light Gold
  '#98FB98', // Mint Green
  '#ADD8E6', // Light Blue

];

// // The line that's supposed to connect the top left corner of the small block in the chain to the expanded block window
// const TopLeftLine = ({ x1, y1, x2, y2}) => {
//  const smallBlockPosition = blockPosition
//  const blockWindowRef = useRef(null)
//     // pulling the location of the blockdata to use in drawing a line between the small block in the chain and the blockdata block
// useEffect(() => {
//   const blockWindow = blockWindowRef.current;
//   if (blockWindow) {
//     const blockWindowPosition = blockWindow.getBoundingClientRect()
//     console.log(blockWindowPosition)
//   }
// }, [blockWindowRef.current])
//   return (
//     <line
//       x1={(smallBlockPosition.left)}
//       y1={(smallBlockPosition.top)}
//       x2={blockWindowRef.current?.getBoundingClientRect().left}
//       y2={(blockWindowRef.current?.getBoundingClientRect().top)}
//       style={{stroke: 'white', strokeWidth: 2}}
//     />
//   );
// }


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
  const blockNumberTitle = blockChainNumberFromApp
  const { decodedBlock } = blockInfo
  // block poster starting location
  const posterStartX = 180
  const posterStartY = 30
  const scale = 0.20

  const [isDragging] = useState(false);
  const [contentHeight, setContentHeight] = useState(1200);

  const textRef = useRef(null);

  // make the height of the BlockData window the height of the blockInfo
  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBoundingClientRect();
      setContentHeight(bbox.height)
      console.log(bbox)
    }
  }, [blockInfo]);

  return (
    <g
      transform={`translate(${posterStartX} ${posterStartY})`}
    >
      <rect
        width={(800)}
        height={(contentHeight+4)}
        stroke='white'
        fill='black'
        strokeWidth='2'
      />
      {/* <TopLeftLine/> */}
      <foreignObject
      // ref={blockWindowRef} // topLeftLine stuff!
        width={(800)/scale}
        height={(contentHeight)/scale}
        transform={`scale(${scale})`}
        
      >
        <div ref={textRef} xmlns="http://www.w3.org/1999/xhtml" className="block-data">
          <Rlp rlpObject={decodedBlock} />
        </div>
      </foreignObject>
      <text
        x={60}
        y={50}
        fill="white"
        fontSize="30">
        Block {blockNumberTitle}
      </text>
      <image
        overflow={'hidden'}
        width='600'
        height={contentHeight}
        x='100'
        y='0'
        href={Ethereum_Logo_2014}
        opacity='20%'/>
    </g>
  );
};

export default BlockData;
