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

const BlockData = ({ blockChainNumberFromApp, setBlockPosition, blockScale, blockObject}) => {
  const blockNumberTitle = blockChainNumberFromApp

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

  // console.log('blockObject:', blockObject)

  // The block header, reconstructed for great justice, also including conditionals for EIP updates. May need to make more conditonals to account for pre Merge blocks
  const parentHash = Buffer.from(blockObject.header.parentHash).toString('hex');
  const uncleHash = Buffer.from(blockObject.header.uncleHash).toString('hex');
  const coinbase = Buffer.from(blockObject.header.coinbase.bytes).toString('hex');
  const stateRoot = Buffer.from(blockObject.header.stateRoot).toString('hex');
  const transactionsTrie = Buffer.from(blockObject.header.transactionsTrie).toString('hex');
  const receiptTrie = Buffer.from(blockObject.header.receiptTrie).toString('hex');
  const logsBloom = Buffer.from(blockObject.header.logsBloom).toString('hex');
  const difficulty = Buffer.from(bigIntToUnpaddedBytes(blockObject.header.difficulty)).toString('hex');
  const number = Buffer.from(bigIntToUnpaddedBytes(blockObject.header.number)).toString('hex');
  const gasLimit = Buffer.from(bigIntToUnpaddedBytes(blockObject.header.gasLimit)).toString('hex');
  const gasUsed = Buffer.from(bigIntToUnpaddedBytes(blockObject.header.gasUsed)).toString('hex');
  const timestamp = Buffer.from(bigIntToUnpaddedBytes(blockObject.header.timestamp ?? BIGINT_0)).toString('hex');
  const extraData = Buffer.from(blockObject.header.extraData).toString('hex');
  const mixHash = Buffer.from(blockObject.header.mixHash).toString('hex');
  const nonce = Buffer.from(blockObject.header.nonce).toString('hex');
  const baseFeePerGas = Buffer.from(bigIntToUnpaddedBytes(blockObject.header.baseFeePerGas)).toString('hex');
  const withdrawalsRoot = Buffer.from(blockObject.header.withdrawalsRoot).toString('hex');
  let blobGasUsed
  if (blockObject.header.blobGasUsed !== undefined) {
    blobGasUsed = Buffer.from(bigIntToUnpaddedBytes(blockObject.header.blobGasUsed)).toString('hex');
  } else {
    blobGasUsed = false
  }
  let excessBlobGas
  if (blockObject.header.excessBlobGas !== undefined) {
    excessBlobGas = Buffer.from(blockObject.header.excessBlobGas).toString('hex');
  } else {
    excessBlobGas = false
  }
  let parentBeaconBlockRoot
  if (blockObject.header.parentBeaconBlockRoot !== undefined) {
    parentBeaconBlockRoot = Buffer.from(blockObject.header.parentBeaconBlockRoot).toString('hex');
  } else {
    parentBeaconBlockRoot = false
  }
  let prevRandao
  if (blockObject.header.prevRandao !== undefined) {
    prevRandao = Buffer.from(blockObject.header.prevRandao).toString('hex'); 
  } else {
    prevRandao = false
  }

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
          <span id='parentHash' style={{color:'white', overflowWrap: 'break-word'}}>{parentHash}</span>
          <span id='uncleHash' style={{color:'white', overflowWrap: 'break-word'}}>{uncleHash}</span>
          <span id='coinbase' style={{color:'white', overflowWrap: 'break-word'}}>{coinbase}</span>
          <span id='stateRoot' style={{color:'white', overflowWrap: 'break-word'}}>{stateRoot}</span>
          <span id='transactionsTrie' style={{color:'white', overflowWrap: 'break-word'}}>{transactionsTrie}</span>
          <span id='receiptTrie' style={{color:'white', overflowWrap: 'break-word'}}>{receiptTrie}</span>
          <span id='logsBloom' style={{color:'white', overflowWrap: 'break-word'}}>{logsBloom}</span>
          <span id='difficulty' style={{color:'white', overflowWrap: 'break-word'}}>{difficulty}</span>
          <span id='number' style={{color:'white', overflowWrap: 'break-word'}}>{number}</span>
          <span id='gasLimit' style={{color:'white', overflowWrap: 'break-word'}}>{gasLimit}</span>
          <span id='gasUsed' style={{color:'white', overflowWrap: 'break-word'}}>{gasUsed}</span>
          <span id='timestamp' style={{color:'white', overflowWrap: 'break-word'}}>{timestamp}</span>
          <span id='extraData' style={{color:'white', overflowWrap: 'break-word'}}>{extraData}</span>
          <span id='mixHash' style={{color:'white', overflowWrap: 'break-word'}}>{mixHash}</span>
          <span id='nonce' style={{color:'white', overflowWrap: 'break-word'}}>{nonce}</span>
          <span id='baseFeePerGas' style={{color:'white', overflowWrap: 'break-word'}}>{baseFeePerGas}</span>
          <span id='withdrawalsRoot' style={{color:'white', overflowWrap: 'break-word'}}>{withdrawalsRoot}</span>
          { blobGasUsed && <span id='blobGasUsed' style={{color:'white', overflowWrap: 'break-word'}}>{blobGasUsed}</span>}
          { excessBlobGas && <span id='excessBlobGas' style={{color:'white', overflowWrap: 'break-word'}}>{excessBlobGas}</span>}
          { parentBeaconBlockRoot && <span id='parentBeaconBlockRoot' style={{color:'white', overflowWrap: 'break-word'}}>{parentBeaconBlockRoot}</span>}
          { prevRandao && <span id='prevRandao' style={{color:'white', overflowWrap: 'break-word'}}>{prevRandao}</span>}
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
