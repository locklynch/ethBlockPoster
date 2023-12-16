// BlockData.jsx The window to show the block being accessed

import React, { useState, useEffect, useRef } from 'react';
import useResizeAndScrollEffect from './ResizeAndScrollHelper';
import EthLogo from './EthLogo';
import {Buffer} from 'buffer'
import { RLP } from '@ethereumjs/rlp'
import { bigIntToUnpaddedBytes } from '@ethereumjs/util'
import {Block} from '@ethereumjs/block'

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

const valueToHex = (value) => value === undefined ? false : Buffer.from(value).toString('hex')
const addressToHex = (value) => value === undefined ? false : Buffer.from(value.bytes).toString('hex')
const bigIntToHex = (value) => value === undefined ? false : Buffer.from(bigIntToUnpaddedBytes(value)).toString('hex')



const BlockData = ({ blockChainNumberFromApp, setBlockPosition, setNoteFromRect, blockScale, blockObject}) => {
  const blockNumberTitle = blockChainNumberFromApp

  // block poster starting location
  const posterStartX = 130
  const posterStartY = 80

  let scale = blockScale
  const [contentHeight, setContentHeight] = useState(1045);
  const blockDataRef = useRef(null)
  const textRef = useRef(null);

  useResizeAndScrollEffect(blockDataRef, setBlockPosition)

  const blockHeaderUtils = {
    parentHash: {
      ref: useRef(),
      value: valueToHex(blockObject.header.parentHash),
    },
    uncleHash: {
      ref: useRef(),
      value: valueToHex(blockObject.header.uncleHash),
    },
    coinbase: {
      ref: useRef(),
      value: addressToHex(blockObject.header.coinbase),
    },
    stateRoot: {
      ref: useRef(),
      value: valueToHex(blockObject.header.stateRoot),
    },
    transactionsTrie: {
      ref: useRef(),
      value: valueToHex(blockObject.header.transactionsTrie),
    },
    receiptTrie: {
      ref: useRef(),
      value: valueToHex(blockObject.header.receiptTrie),
    },
    logsBloom: {
      ref: useRef(),
      value: valueToHex(blockObject.header.logsBloom),
    },
    difficulty: {
      ref: useRef(),
      value: bigIntToHex(blockObject.header.difficulty),
    },
    number: {
      ref: useRef(),
      value: bigIntToHex(blockObject.header.number),
    },
    gasLimit: {
      ref: useRef(),
      value: bigIntToHex(blockObject.header.gasLimit),
    },
    gasUsed: {
      ref: useRef(),
      value: bigIntToHex(blockObject.header.gasUsed),
    },
    timestamp: {
      ref: useRef(),
      value: bigIntToHex(blockObject.header.timestamp ?? BIGINT_0),
    },
    extraData: {
      ref: useRef(),
      value: valueToHex(blockObject.header.extraData),
    },
    mixHash: {
      ref: useRef(),
      value: valueToHex(blockObject.header.mixHash),
    },
    nonce: {
      ref: useRef(),
      value: valueToHex(blockObject.header.nonce),
    },
    baseFeePerGas: {
      ref: useRef(),
      value: bigIntToHex(blockObject.header.baseFeePerGas),
    },
    withdrawalsRoot: {
      ref: useRef(),
      value: valueToHex(blockObject.header.withdrawalsRoot),
    },
    blobGasUsed: {
      ref: useRef(bigIntToHex(blockObject.header.blobGasUsed)),
      value: null,
    },
    excessBlobGas: {
      ref: useRef(),
      value: bigIntToHex(blockObject.header.excessBlobGas),
    },
    parentBeaconBlockRoot: {
      ref: useRef(),
      value: valueToHex(blockObject.header.parentBeaconBlockRoot),
    },
    prevRandao: {
      ref: useRef(),
      value: valueToHex(blockObject.header.prevRandao),
    },
  }
  Object.keys(blockHeaderUtils).map((id) => {
    useResizeAndScrollEffect(blockDataRef, (rect) => setNoteFromRect(id, rect))
  })

  // const transactionsObj = blockObject.transactions.map(transaction => ({
  //   type: Buffer.from(bigIntToUnpaddedBytes(transaction.type)).toString('hex'),
  //   nonce: Buffer.from(bigIntToUnpaddedBytes(transaction.nonce)).toString('hex'),
  //   gasLimit: Buffer.from(bigIntToUnpaddedBytes(transaction.gasLimit)).toString('hex'),
  //   to: transaction.to,
  //   value: Buffer.from(bigIntToUnpaddedBytes(transaction.value)).toString('hex'),
  //   data: transaction.data,
  //   v: transaction.v,
  //   r: transaction.r,
  //   s: transaction.s,
  //   chainId: transaction.chainId,
  //   maxPriorityFeePerGas: transaction.maxPriorityFeePerGas,
  //   maxFeePerGas: transaction.maxFeePerGas,
  //   accessList: transaction.accessList,
  // }));

  // console.log('allTransactions:', transactionsObj)


  // The Transactions, reconstructed
  const transactionsObj = blockObject.transactions.map(transaction => ({
    type: transaction.type,
    nonce: transaction.nonce,
    gasLimit: transaction.gasLimit,
    to: transaction.to,
    value: transaction.value,
    data: transaction.data,
    v: transaction.v,
    r: transaction.r,
    s: transaction.s,
    chainId: transaction.chainId,
    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas,
    maxFeePerGas: transaction.maxFeePerGas,
    accessList: transaction.accessList,
  }));


  const transactionsString = Buffer.from((transactionsObj.map(transaction => {
    return (`
      type: ${transaction.type}
      Nonce: ${transaction.nonce}
      Gas Limit: ${transaction.gasLimit}
      to: ${transaction.to}
      value: ${transaction.value}
      data: ${transaction.data}
      v: ${transaction.v}
      r: ${transaction.r}
      s: ${transaction.s}
      chainId: ${transaction.chainId}
      maxPriorityFeePerGas: ${transaction.maxPriorityFeePerGas}
      maxFeePerGas: ${transaction.maxFeePerGas}
      accessList: ${transaction.accessList}
    `);
  }).join(''))).toString('hex')

  // The Uncles reconstructed
  const uncleHeadersArr = blockObject.uncleHeaders.map(uncleHeader => ({
    uncleParentHash: Buffer.from(uncleHeader.parentHash).toString('hex'),
    uncleUncleHash: Buffer.from(uncleHeader.uncleHash).toString('hex'),
    uncleCoinbase: Buffer.from(uncleHeader.coinbase.bytes).toString('hex'),
    uncleStateRoot: Buffer.from(uncleHeader.stateRoot).toString('hex'),
    uncleTransactionsTrie: Buffer.from(uncleHeader.transactionsTrie).toString('hex'),
    uncleReceiptTrie: Buffer.from(uncleHeader.receiptTrie).toString('hex'),
    uncleLogsBloom: Buffer.from(uncleHeader.logsBloom).toString('hex'),
    uncleDifficulty: Buffer.from(bigIntToUnpaddedBytes(uncleHeader.difficulty)).toString('hex'),
    uncleNumber: Buffer.from(bigIntToUnpaddedBytes(uncleHeader.number)).toString('hex'),
    uncleGasLimit: Buffer.from(bigIntToUnpaddedBytes(uncleHeader.gasLimit)).toString('hex'),
    uncleGasUsed: Buffer.from(bigIntToUnpaddedBytes(uncleHeader.gasUsed)).toString('hex'),
    uncleTimestamp: Buffer.from(bigIntToUnpaddedBytes(uncleHeader.timestamp ?? BIGINT_0)).toString('hex'),
    uncleExtraData: Buffer.from(uncleHeader.extraData).toString('hex'),
    uncleMixHash: Buffer.from(uncleHeader.mixHash).toString('hex'),
    uncleNonce: Buffer.from(uncleHeader.nonce).toString('hex'),
    uncleBaseFeePerGas: Buffer.from(bigIntToUnpaddedBytes(uncleHeader.baseFeePerGas)).toString('hex'),
    uncleWithdrawalsRoot: Buffer.from(uncleHeader.withdrawalsRoot).toString('hex'),
  }))

  const uncleHeadersString = Buffer.from((uncleHeadersArr.map(uncleHeader => {
    return (`
      parentHash: ${uncleHeader.parentHash}
      uncleHash: ${uncleHeader.uncleHash}
      coinbase: ${uncleHeader.coinbase}
      stateRoot: ${uncleHeader.stateRoot}
      transactionsTrie: ${uncleHeader.transactionsTrie}
      recepitTrie: ${uncleHeader.receiptTrie}
      logsBloom: ${uncleHeader.logsBloom}
      difficulty: ${uncleHeader.difficulty}
      number: ${uncleHeader.number}
      gasLimit: ${uncleHeader.gasLimit}
      gasUsed: ${uncleHeader.gasUsed}
      timeStamp: ${uncleHeader.timestamp}
      extraData: ${uncleHeader.extraData}
      mixHash: ${uncleHeader.mixHash}
      nonce: ${uncleHeader.nonce}
      baseFeePerGas: ${uncleHeader.baseFeePerGas}
    `);
  }).join(''))).toString('hex')

    // The Transactions, reconstructed
    const withdrawalsArr = blockObject.withdrawals.map(withdrawal => ({
      address: withdrawal.address,
      amount: withdrawal.amount,
      index: withdrawal.index,
      validatorIndex: withdrawal.validatorIndex,
    }));
  
    const withdrawalsString = Buffer.from((withdrawalsArr.map(withdrawal => {
      return (`
        address: ${withdrawal.address}
        amount: ${withdrawal.amount}
        index: ${withdrawal.index}
        validatorIndex: ${withdrawal.validatorIndex}
      `);
    }).join(''))).toString('hex')


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
          <span ref={blockHeaderUtils.parentHash.ref} id='parentHash' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.parentHash.value}</span>
          <span ref={blockHeaderUtils.uncleHash.ref} id='uncleHash' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.uncleHash.value}</span>
          <span ref={blockHeaderUtils.coinbase.ref} id='coinbase' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.coinbase.value}</span>
          <span ref={blockHeaderUtils.stateRoot.ref} id='stateRoot' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.stateRoot.value}</span>
          <span ref={blockHeaderUtils.transactionsTrie.ref} id='transactionsTrie' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.transactionsTrie.value}</span>
          <span ref={blockHeaderUtils.receiptTrie.ref} id='receiptTrie' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.receiptTrie.value}</span>
          <span ref={blockHeaderUtils.logsBloom.ref} id='logsBloom' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.logsBloom.value}</span>
          <span ref={blockHeaderUtils.difficulty.ref} id='difficulty' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.difficulty.value}</span>
          <span ref={blockHeaderUtils.number.ref} id='number' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.number.value}</span>
          <span ref={blockHeaderUtils.gasLimit.ref} id='gasLimit' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.gasLimit.value}</span>
          <span ref={blockHeaderUtils.gasUsed.ref} id='gasUsed' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.gasUsed.value}</span>
          <span ref={blockHeaderUtils.timestamp.ref} id='timestamp' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.timestamp.value}</span>
          <span ref={blockHeaderUtils.extraData.ref} id='extraData' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.extraData.value}</span>
          <span ref={blockHeaderUtils.mixHash.ref} id='mixHash' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.mixHash.value}</span>
          <span ref={blockHeaderUtils.nonce.ref} id='nonce' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.nonce.value}</span>
          <span ref={blockHeaderUtils.baseFeePerGas.ref} id='baseFeePerGas' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.baseFeePerGas.value}</span>
          <span ref={blockHeaderUtils.withdrawalsRoot.ref} id='withdrawalsRoot' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.withdrawalsRoot.value}</span>
          
          { blockHeaderUtils.blobGasUsed.value && <span id='blobGasUsed' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.blobGasUsed.value}</span>}
          { blockHeaderUtils.excessBlobGas.value && <span id='excessBlobGas' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.excessBlobGas.value}</span>}
          { blockHeaderUtils.parentBeaconBlockRoot.value && <span id='parentBeaconBlockRoot' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.parentBeaconBlockRoot.value}</span>}
          { blockHeaderUtils.prevRandao.value && <span id='prevRandao' style={{color:'white', overflowWrap: 'break-word'}}>{blockHeaderUtils.prevRandao.value}</span>}
          
          <span id='transactionsString' style={{color:'white', overflowWrap: 'break-word'}}>{transactionsString}</span>
          <span id='uncleHeadersString' style={{color:'white', overflowWrap: 'break-word'}}>{uncleHeadersString}</span>
          <span id='withdrawalsString' style={{color:'white', overflowWrap: 'break-word'}}>{withdrawalsString}</span>


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
