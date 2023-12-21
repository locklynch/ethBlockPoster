// BlockData.jsx The window to show the block being accessed

import React, { useState, useEffect, useRef } from 'react';
import useResizeAndScrollEffect from './ResizeAndScrollHelper';
import EthLogo from './EthLogo';
import {Buffer} from 'buffer'
import { RLP } from '@ethereumjs/rlp'
// import { bigIntToUnpaddedBytes } from '@ethereumjs/util'
// import {Block} from '@ethereumjs/block'
import BlockUtils from './BlockUtils'

const colorPalette = [
  '#FFD1DC', // Light Pink
  '#FFD700', // Light Gold
  '#98FB98', // Mint Green
  '#ADD8E6', // Light Blue

];

const useColorPalette = () => {

  let colorIndex = 0

  const getColor = () => {
    colorIndex += 1
    const color = colorPalette[colorIndex % colorPalette.length]
    return color
  }

  return getColor
}

const BlockData = ({ blockChainNumberFromApp, setBlockPosition, setNoteFromRect, blockScale, blockObject, isToggled, setTransactionStringRect, setWithdrawalStringRect}) => {
  const blockNumberTitle = blockChainNumberFromApp
  const getColor = useColorPalette()

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

  useResizeAndScrollEffect(blockDataRef, setBlockPosition)

  const blockHeaderUtils = BlockUtils(blockObject)

  Object.keys(blockHeaderUtils).map((id) => {
    const {ref} = blockHeaderUtils[id];
    useResizeAndScrollEffect(ref, (rect) => setNoteFromRect(id, rect))
  })

  const transactionsString = ((blockObject.transactions.map(transaction => {
    return (
      Buffer.from(transaction.serialize()).toString('hex')
    );
  }).join('')))

  const withdrawalsString = ((blockObject.withdrawals.map(withdrawal => {
    return (
      Buffer.from(RLP.encode(withdrawal.raw())).toString('hex')
    );
  }).join('')))


  useEffect(() => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setContentHeight(rect.height)
    };

    if (transactionStringRef.current) {
      const transactionStringRect = transactionStringRef.current.getBoundingClientRect();
      setTransactionStringRect(transactionStringRect)
    };

    if (withdrawalStringRef.current) {
      const withdrawalStringRect = withdrawalStringRef.current.getBoundingClientRect();
      setWithdrawalStringRect(withdrawalStringRect);
    };
  }, [blockObject, blockScale, isToggled, setTransactionStringRect, setWithdrawalStringRect]);

  return (
    <g
      transform={`translate(${posterStartX} ${posterStartY})`}
    >
      <rect
        width={803 + (marginRight * scale)}
        height={contentHeight + (marginBottom * scale)}
        stroke='white'
        fill='black'
        strokeWidth='2'
        fillOpacity={'70%'}
        ref={blockDataRef}
      />
      <svg
        overflow={'hidden'}
        width='600'
        height={contentHeight}
        x='100'
        y='0'
        opacity='60%'>
          <EthLogo/>
        </svg>
      <foreignObject
        x={7}
        y={5}
        width={(795) / scale}
        height={contentHeight/scale}
        transform={`scale(${scale})`}
      >
        <div
          ref={textRef}
          xmlns="http://www.w3.org/1999/xhtml"
          className="block-data"
        >
          <span ref={blockHeaderUtils.parentHash.ref} id='parentHash' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.parentHash.value}</span>
          <span ref={blockHeaderUtils.uncleHash.ref} id='uncleHash' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.uncleHash.value}</span>
          <span ref={blockHeaderUtils.coinbase.ref} id='coinbase' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.coinbase.value}</span>
          <span ref={blockHeaderUtils.stateRoot.ref} id='stateRoot' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.stateRoot.value}</span>
          <span ref={blockHeaderUtils.transactionsTrie.ref} id='transactionsTrie' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.transactionsTrie.value}</span>
          <span ref={blockHeaderUtils.receiptTrie.ref} id='receiptTrie' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.receiptTrie.value}</span>
          <span ref={blockHeaderUtils.logsBloom.ref} id='logsBloom' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.logsBloom.value}</span>
          <span ref={blockHeaderUtils.difficulty.ref} id='difficulty' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.difficulty.value}</span>
          <span ref={blockHeaderUtils.number.ref} id='number' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.number.value}</span>
          <span ref={blockHeaderUtils.gasLimit.ref} id='gasLimit' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.gasLimit.value}</span>
          <span ref={blockHeaderUtils.gasUsed.ref} id='gasUsed' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.gasUsed.value}</span>
          <span ref={blockHeaderUtils.timestamp.ref} id='timestamp' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.timestamp.value}</span>
          <span ref={blockHeaderUtils.extraData.ref} id='extraData' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.extraData.value}</span>
          <span ref={blockHeaderUtils.mixHash.ref} id='mixHash' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.mixHash.value}</span>
          <span ref={blockHeaderUtils.nonce.ref} id='nonce' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.nonce.value}</span>
          <span ref={blockHeaderUtils.baseFeePerGas.ref} id='baseFeePerGas' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.baseFeePerGas.value}</span>
          <span ref={blockHeaderUtils.withdrawalsRoot.ref} id='withdrawalsRoot' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.withdrawalsRoot.value}</span>
          
          { blockHeaderUtils.blobGasUsed.value && <span ref={blockHeaderUtils.blobGasUsed.ref} id='blobGasUsed' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.blobGasUsed.value}</span>}
          { blockHeaderUtils.excessBlobGas.value && <span ref={blockHeaderUtils.excessBlobGas.ref} id='excessBlobGas' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.excessBlobGas.value}</span>}
          { blockHeaderUtils.parentBeaconBlockRoot.value && <span ref={blockHeaderUtils.parentBeaconBlockRoot.ref} id='parentBeaconBlockRoot' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.parentBeaconBlockRoot.value}</span>}
          { blockHeaderUtils.prevRandao.value && <span ref={blockHeaderUtils.prevRandao.ref} id='prevRandao' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{blockHeaderUtils.prevRandao.value}</span>}
          
          { isToggled && <span ref={transactionStringRef} id='transactionsString' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{transactionsString}</span>}
          {/* <span id='uncleHeadersString' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{uncleHeadersString}</span> */}
          { isToggled && <span ref={withdrawalStringRef} id='withdrawalsString' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{withdrawalsString}</span>}


          {/* <Rlp rlpObject={parentHash} /> */}
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
    </g>
  );
};

export default BlockData;
