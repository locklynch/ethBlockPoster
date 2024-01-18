import React, { useState, useEffect, useRef, useContext } from 'react';
import useResizeAndScrollEffect from './ResizeAndScrollHelper';
import BlockUtils from './BlockUtils'
// import { getColor, resetColorIndex } from './ColorUtils'
import { RLP } from '@ethereumjs/rlp'
import { makeGetColor } from './ColorUtils'
import { ThemeContext, getPalette } from './GlobalColorPalette';

const Withdrawal = ({blockObject, blockScale, setToWithdrawalRect, isToggled}) => {
  
  const theme = useContext(ThemeContext);
  const palette = getPalette(theme);
  const getColor = makeGetColor(palette);
  // resetColorIndex()

  // block poster starting location
  const posterStartX = 500
  const posterStartY = 1000
  const marginRight = 5
  const marginBottom = 10
  const windowWidth = 400

  let scale = blockScale * 4.5
  const [contentHeight, setContentHeight] = useState(1045);
  const targetBlockRef = useRef(null)
  const textRef = useRef(null);

  useResizeAndScrollEffect(targetBlockRef, setToWithdrawalRect)

  const blockHeaderUtils = BlockUtils(blockObject)

  Object.keys(blockHeaderUtils).map((id) => {
    const {ref} = blockHeaderUtils[id];
    useResizeAndScrollEffect(ref, (rect) => setNoteFromRect(id, rect))
  })

  const singleWithdrawal = (() => {
    if (blockObject.withdrawals.length > 0) {
      const firstWithdrawal = blockObject.withdrawals[0];
      if (firstWithdrawal && typeof firstWithdrawal.raw === 'function') {
        return Buffer.from(RLP.encode(firstWithdrawal.raw())).toString('hex');
      } else {
        return "Invalid withdrawal structure";
      }
    } else {
      return "No withdrawals available";
    }
  })();

//   const singleWithdrawal = (() => {
//     if (blockObject.withdrawals.length > 0) {
//       const firstWithdrawal = blockObject.withdrawals[0];
//       if (firstWithdrawal && typeof firstWithdrawal.raw === 'function') {
//         return Buffer.from(RLP.encode(firstWithdrawal.raw())).toString('hex');
//       } else {
//         return "Invalid withdrawal structure";
//       }
//     } else {
//       return "No withdrawals available";
//     }
//   })();
//   const singleWithdrawal = (() => {
//     if (blockObject.withdrawals.length > 0) {
//       return Buffer.from(blockObject.withdrawals[0].serialize()).toString('hex');
//     } else {
//       return "No withdrawals available";
//     }
//   })();

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
        width={windowWidth + (marginRight * scale)}
        height={contentHeight + (marginBottom * scale)}
        stroke='white'
        fill='black'
        strokeWidth='2'
        fillOpacity={'70%'}
        ref={targetBlockRef}
      />
      <text
        x={60}
        y={50}
        fill="white"
        fontSize="60"
        opacity={'40%'}
      >
        withdrawal
      </text>
      <foreignObject
        x={7}
        y={5}
        width={(windowWidth - 5) / scale}
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
            {singleWithdrawal}
          </span>}
      </div>
      </foreignObject>
    </g>
  )
}

export default Withdrawal