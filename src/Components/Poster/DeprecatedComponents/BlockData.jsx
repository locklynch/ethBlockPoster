// BlockData.jsx The window to show the block being accessed

import React, { useState, useEffect, useRef, useContext } from 'react';
import useResizeAndScrollEffect from './ResizeAndScrollHelper';
import EthLogo from '../EthLogo';
import {Buffer} from 'buffer'
import { RLP } from '@ethereumjs/rlp'
// import { bigIntToUnpaddedBytes } from '@ethereumjs/util'
// import {Block} from '@ethereumjs/block'
import BlockUtils from '../BlockUtils'
// import GlobalColorPalette from './GlobalColorPalette';
import { makeGetColor } from '../ColorUtils'
import { ThemeContext, getPalette } from '../GlobalColorPalette';
// const { resetColorIndex, getColor} = GlobalColorPalette()

const BlockData = ({ blockChainNumberFromApp, setBlockPosition, setBlockHeaderPosition, blockScale, blockObject, isToggled, setTransactionStringRect, setWithdrawalStringRect, setFromTransactionRect, setFromWithdrawalRect}) => {
  const blockNumberTitle = blockChainNumberFromApp

  const theme = useContext(ThemeContext);
  const palette = getPalette(theme);
  const getColor = makeGetColor(palette);

  // block poster starting details
  const posterStartX = 50
  const posterStartY = 80
  const marginRight = 5
  const marginBottom = 10
  const opacity = '100%'
  const svgOpacity = '50%'


  let scale = blockScale
  const [contentHeight, setContentHeight] = useState(1045);
  const blockDataRef = useRef(null)
  const textRef = useRef(null);
  const blockHeaderRef = useRef(1)
  const transactionStringRef = useRef(1000)
  const withdrawalStringRef = useRef(null)
  const transactionRef = useRef(null)
  const withdrawalRef = useRef(null)

  useResizeAndScrollEffect(blockDataRef, setBlockPosition)
  useResizeAndScrollEffect(blockHeaderRef, setBlockHeaderPosition)
  useResizeAndScrollEffect(transactionRef, setFromTransactionRect)
  useResizeAndScrollEffect(withdrawalRef, setFromWithdrawalRect)

  const blockHeaderUtils = BlockUtils(blockObject)

  // make the blockheader
  const blockHeaderString = () => {
    Object.keys(blockHeaderUtils).map((id) => {
      const {ref} = blockHeaderUtils[id];
    })

    return (
      <div
        ref={textRef}
        xmlns="http://www.w3.org/1999/xhtml"
        className="block-data"
      >
        <div
          ref={blockHeaderRef}
        >
          <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.parentHash.value}</span>
          {/* <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.uncleHash.value}</span> */}
          <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.coinbase.value}</span>
          <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.stateRoot.value}</span>
          <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.transactionsTrie.value}</span>
          <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.receiptTrie.value}</span>
          <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.logsBloom.value}</span>
          {/* <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.difficulty.value}</span> */}
          <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.number.value}</span>
          <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.gasLimit.value}</span>
          <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.gasUsed.value}</span>
          <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.timestamp.value}</span>
          <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.extraData.value}</span>
          <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.mixHash.value}</span>
          {/* <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.nonce.value}</span> */}
          <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.baseFeePerGas.value}</span>
          <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.withdrawalsRoot.value}</span>
          
          {/* { blockHeaderUtils.blobGasUsed.value && <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.blobGasUsed.value}</span>}
          { blockHeaderUtils.excessBlobGas.value && <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.excessBlobGas.value}</span>}
          { blockHeaderUtils.parentBeaconBlockRoot.value && <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.parentBeaconBlockRoot.value}</span>} */}
          { blockHeaderUtils.prevRandao.value && <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{blockHeaderUtils.prevRandao.value}</span>}
        </div>
        
        { isToggled && 
          <div ref={transactionStringRef} id='transactionsString'>
            <span ref={transactionRef} id='firstTransaction' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{singleTransaction}</span>
            <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{transactionsExceptFirstString}</span>
          </div>}
        {/* <span id='uncleHeadersString' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{uncleHeadersString}</span> */}
        { isToggled && 
          <div ref={withdrawalStringRef} id='withdrawalString'>
            <span ref={withdrawalRef} id='firstWithdrawal' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{singleWithdrawal}</span>
            <span style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{withdrawalsExceptFirstString}</span>
          </div>}
        {/* { isToggled && <span ref={withdrawalStringRef} id='withdrawalsString' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100', opacity: opacity}}>{withdrawalsString}</span>} */}


        {/* <Rlp rlpObject={parentHash} /> */}
      </div>
    )

  }
  
  // make the first transaction alone
  const singleTransaction = (() => {
    if (blockObject.transactions.length > 0) {
      return Buffer.from(blockObject.transactions[0].serialize()).toString('hex');
    } else {
      return "No first transaction";
    }
  })();
  // make rest of transactions
  const transactionsExceptFirst = blockObject.transactions.slice(1)
  const transactionsExceptFirstString = ((transactionsExceptFirst.map(transaction => {
    return (
      Buffer.from(transaction.serialize()).toString('hex')
    );
  }).join('')))

  // make the first withdrawal alone
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

  // make rest of withdrawals
  const withdrawalsExceptFirst = blockObject.withdrawals.slice(1);
  const withdrawalsExceptFirstString = (() => {
    if (blockObject.withdrawals.length > 1) {
      return withdrawalsExceptFirst.map(withdrawal => (
        Buffer.from(RLP.encode(withdrawal.raw())).toString('hex')
      )).join('');
    } else {
      return "No additional withdrawals";
    }
  })();
  

  // make the withdrawals
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
      className='hidden'
      transform={`translate(${posterStartX} ${posterStartY})`}
    >
      <rect
        width={803 + (marginRight * scale)}
        height={contentHeight + (marginBottom * scale)}
        stroke='white'
        fill='black'
        strokeWidth='2'
        fillOpacity='90%'
        ref={blockDataRef}
      />
      <svg
        overflow={'hidden'}
        width='600'
        height={contentHeight}
        x='100'
        y='0'
        opacity={svgOpacity}>
          <EthLogo/>
      </svg>
      <foreignObject
        x={7}
        y={5}
        width={(795) / scale}
        height={contentHeight/scale}
        transform={`scale(${scale})`}
      >
      {blockHeaderString()}
      {/* <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        stroke="white"
        strokeWidth="1"
        fill="transparent"
      /> */}
      </foreignObject>
      {/* <rect
        stroke='white'
        strokeWidth={'2'}
        x={265}
        y={566}
        width={300}
        height={40}

      /> */}
      <text
        x={220}
        y={500}
        fill="white"
        fontSize="150"
        opacity={'40%'}
      >
        block
      </text>
      <text
        x={60}
        y={660}
        fill="white"
        fontSize="150"
        opacity={'40%'}
      >
        {blockNumberTitle}
      </text>
    </g>
  );
};

export default BlockData;
