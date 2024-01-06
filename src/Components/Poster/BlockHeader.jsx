import React, { useState, useEffect, useRef } from 'react';
// import useResizeAndScrollEffect from './ResizeAndScrollHelper';
import BlockUtils from './BlockUtils'
import blockHeaderString from './BlockData';
import { getColor, resetColorIndex } from './GlobalColorPalette';

const BlockHeader = ({blockChainNumberFromApp, blockObject, blockScale}) => {
  const getColorForBlockData = getColor()
  resetColorIndex()

  // block poster starting location
  const posterStartX = 80
  const posterStartY = 90
  const marginRight = 5
  const marginBottom = 10

  let scale = blockScale
  const [contentHeight, setContentHeight] = useState(1045);
  const blockDataRef = useRef(null)
  const textRef = useRef(null);
  const transactionStringRef = useRef(null)
  const withdrawalStringRef = useRef(null)

  // i forget what this is for! def check it later
  // useResizeAndScrollEffect(blockDataRef, setBlockPosition)

  const blockHeaderUtils = BlockUtils(blockObject)

  useEffect(() => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setContentHeight(rect.height)
    };
  }, [blockObject, blockScale]);


  return (
    <g
      transform={`translate(${posterStartX} ${posterStartY})`}
    >
      <rect
        width={600 + (marginRight * scale)}
        height={contentHeight + (marginBottom * scale)}
        stroke='white'
        fill='black'
        strokeWidth='2'
        fillOpacity={'70%'}
        ref={blockDataRef}
      />
      <foreignObject
        x={7}
        y={5}
        width={(795) / scale}
        height={contentHeight/scale}
        transform={`scale(${scale})`}
      >
      {blockHeaderString()}
      </foreignObject>
    </g>
  )
}

export default BlockHeader