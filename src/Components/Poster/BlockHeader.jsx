import React, { useState, useEffect, useRef } from 'react';
import useResizeAndScrollEffect from './ResizeAndScrollHelper';
import BlockUtils from './BlockUtils'
import blockHeaderString from './BlockData';
import { getColor, resetColorIndex } from './GlobalColorPalette';

const BlockHeader = ({blockChainNumberFromApp, blockObject, blockScale, setNoteFromRect}) => {
  const getColorForBlockData = getColor()
  resetColorIndex()

  // block poster starting location
  const posterStartX = 300
  const posterStartY = 500
  const marginRight = 5
  const marginBottom = 10

  let scale = blockScale * 5
  const [contentHeight, setContentHeight] = useState(1045);
  const blockDataRef = useRef(null)
  const textRef = useRef(null);
  const transactionStringRef = useRef(null)
  const withdrawalStringRef = useRef(null)

  // i forget what this is for! def check it later
  // useResizeAndScrollEffect(blockDataRef, setBlockPosition)

  const blockHeaderUtils = BlockUtils(blockObject)

    // make the blockheader
    const blockHeaderString = () => {
      Object.keys(blockHeaderUtils).map((id) => {
        const {ref} = blockHeaderUtils[id];
        useResizeAndScrollEffect(ref, (rect) => setNoteFromRect(id, rect))
      })
  
      return (
        <div
          ref={textRef}
          xmlns="http://www.w3.org/1999/xhtml"
          className="block-data"
        >
          <span ref={blockHeaderUtils.parentHash.ref} id='parentHash' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.parentHash.value}</span>
          {/* <span ref={blockHeaderUtils.uncleHash.ref} id='uncleHash' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.uncleHash.value}</span> */}
          <span ref={blockHeaderUtils.coinbase.ref} id='coinbase' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.coinbase.value}</span>
          <span ref={blockHeaderUtils.stateRoot.ref} id='stateRoot' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.stateRoot.value}</span>
          <span ref={blockHeaderUtils.transactionsTrie.ref} id='transactionsTrie' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.transactionsTrie.value}</span>
          <span ref={blockHeaderUtils.receiptTrie.ref} id='receiptTrie' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.receiptTrie.value}</span>
          <span ref={blockHeaderUtils.logsBloom.ref} id='logsBloom' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.logsBloom.value}</span>
          {/* <span ref={blockHeaderUtils.difficulty.ref} id='difficulty' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.difficulty.value}</span> */}
          <span ref={blockHeaderUtils.number.ref} id='number' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.number.value}</span>
          <span ref={blockHeaderUtils.gasLimit.ref} id='gasLimit' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.gasLimit.value}</span>
          <span ref={blockHeaderUtils.gasUsed.ref} id='gasUsed' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.gasUsed.value}</span>
          <span ref={blockHeaderUtils.timestamp.ref} id='timestamp' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.timestamp.value}</span>
          <span ref={blockHeaderUtils.extraData.ref} id='extraData' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.extraData.value}</span>
          <span ref={blockHeaderUtils.mixHash.ref} id='mixHash' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.mixHash.value}</span>
          {/* <span ref={blockHeaderUtils.nonce.ref} id='nonce' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.nonce.value}</span> */}
          <span ref={blockHeaderUtils.baseFeePerGas.ref} id='baseFeePerGas' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.baseFeePerGas.value}</span>
          <span ref={blockHeaderUtils.withdrawalsRoot.ref} id='withdrawalsRoot' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.withdrawalsRoot.value}</span>
          
          {/* { blockHeaderUtils.blobGasUsed.value && <span ref={blockHeaderUtils.blobGasUsed.ref} id='blobGasUsed' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.blobGasUsed.value}</span>}
          { blockHeaderUtils.excessBlobGas.value && <span ref={blockHeaderUtils.excessBlobGas.ref} id='excessBlobGas' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.excessBlobGas.value}</span>}
          { blockHeaderUtils.parentBeaconBlockRoot.value && <span ref={blockHeaderUtils.parentBeaconBlockRoot.ref} id='parentBeaconBlockRoot' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.parentBeaconBlockRoot.value}</span>} */}
          { blockHeaderUtils.prevRandao.value && <span ref={blockHeaderUtils.prevRandao.ref} id='prevRandao' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.prevRandao.value}</span>}
        </div>
      )
  
    }

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
        width={(595) / scale}
        height={contentHeight/scale}
        transform={`scale(${scale})`}
      >
      {blockHeaderString()}
      </foreignObject>
    </g>
  )
}

export default BlockHeader