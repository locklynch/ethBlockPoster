import React, { useState, useEffect, useRef } from 'react';
import useResizeAndScrollEffect from './ResizeAndScrollHelper';
import BlockUtils from './BlockUtils'
import { getColor, resetColorIndex } from './ColorUtils'

const Transaction = ({blockObject, blockScale, setToTransactionRect, isToggled}) => {
  
  resetColorIndex()

  // block poster starting location
  const posterStartX = 175
  const posterStartY = 600
  const marginRight = 5
  const marginBottom = 10

  let scale = blockScale * 4.5
  const [contentHeight, setContentHeight] = useState(1045);
  const targetBlockRef = useRef(null)
  const textRef = useRef(null);

  useResizeAndScrollEffect(targetBlockRef, setToTransactionRect)

  const blockHeaderUtils = BlockUtils(blockObject)

  Object.keys(blockHeaderUtils).map((id) => {
    const {ref} = blockHeaderUtils[id];
    useResizeAndScrollEffect(ref, (rect) => setNoteFromRect(id, rect))
  })

  const singleTransaction = (() => {
    if (blockObject.transactions.length > 0) {
      return Buffer.from(blockObject.transactions[0].serialize()).toString('hex');
    } else {
      return "No transactions available";
    }
  })();

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
        width={500 + (marginRight * scale)}
        height={contentHeight + (marginBottom * scale)}
        stroke='white'
        fill='black'
        strokeWidth='2'
        fillOpacity={'70%'}
        ref={targetBlockRef}
      />
      <text
        x={65}
        y={80}
        fill="white"
        fontSize="80"
        opacity={'50%'}
      >
        transaction
      </text>
      <foreignObject
        x={7}
        y={5}
        width={(495) / scale}
        height={contentHeight/scale}
        transform={`scale(${scale})`}
      >
      <div
        ref={textRef}
        xmlns="http://www.w3.org/1999/xhtml"
        className="Transaction"
      >
        { isToggled && <span
          // ref={transactionStringRef}
          id='transactionWindow'
          style={{color: getColor(),
            overflowWrap: 'break-word',
            width: '100',
            height: '100',
            opacity: '50%',
          }}>
            {singleTransaction}
          </span>}
      </div>
      </foreignObject>
    </g>
  )
}

export default Transaction