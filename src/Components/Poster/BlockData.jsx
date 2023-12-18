// BlockData.jsx The window to show the block being accessed

import React, { useState, useEffect, useRef } from 'react';
import useResizeAndScrollEffect from './ResizeAndScrollHelper';
import EthLogo from './EthLogo';
import {Buffer} from 'buffer'
import { RLP } from '@ethereumjs/rlp'
import { bigIntToUnpaddedBytes } from '@ethereumjs/util'
import {Block} from '@ethereumjs/block'
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


// const Rlp = ({ rlpObject, colorIndex = 0, parentKey='' }) => {
//   if (!Array.isArray(rlpObject)) {
//     const hexString = Buffer.from(rlpObject).toString('hex')
//     const color = colorPalette[colorIndex % colorPalette.length]
//     return (
//       <span style={{ color, overflowWrap: 'break-word'}}>{hexString}</span>
//     )
//   }
//   return rlpObject.map((item, index) => {
//     const key = `${parentKey}-${index}`
//     return (
//       <Rlp
//         rlpObject={item}
//         colorIndex={colorIndex + index}
//         key={key}
//         parentKey={key}
//       />
//     )
//   })
// }

const BlockData = ({ blockChainNumberFromApp, setBlockPosition, setNoteFromRect, blockScale, blockObject}) => {
  const blockNumberTitle = blockChainNumberFromApp
  const getColor = useColorPalette()

  // block poster starting location
  const posterStartX = 130
  const posterStartY = 80

  let scale = blockScale
  const [contentHeight, setContentHeight] = useState(1045);
  const blockDataRef = useRef(null)
  const textRef = useRef(null);

  useResizeAndScrollEffect(blockDataRef, setBlockPosition)

  const valueToHex = (value) => value === undefined ? false : Buffer.from(value).toString('hex')
  const addressToHex = (value) => value === undefined ? false : Buffer.from(value.bytes).toString('hex')
  const bigIntToHex = (value) => value === undefined ? false : Buffer.from(bigIntToUnpaddedBytes(value)).toString('hex')

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

  // // The Uncles reconstructed
  // const uncleHeadersArr = blockObject.uncleHeaders.map(uncleHeader => ({
  //   uncleParentHash: Buffer.from(uncleHeader.parentHash).toString('hex'),
  //   uncleUncleHash: Buffer.from(uncleHeader.uncleHash).toString('hex'),
  //   uncleCoinbase: Buffer.from(uncleHeader.coinbase.bytes).toString('hex'),
  //   uncleStateRoot: Buffer.from(uncleHeader.stateRoot).toString('hex'),
  //   uncleTransactionsTrie: Buffer.from(uncleHeader.transactionsTrie).toString('hex'),
  //   uncleReceiptTrie: Buffer.from(uncleHeader.receiptTrie).toString('hex'),
  //   uncleLogsBloom: Buffer.from(uncleHeader.logsBloom).toString('hex'),
  //   uncleDifficulty: Buffer.from(bigIntToUnpaddedBytes(uncleHeader.difficulty)).toString('hex'),
  //   uncleNumber: Buffer.from(bigIntToUnpaddedBytes(uncleHeader.number)).toString('hex'),
  //   uncleGasLimit: Buffer.from(bigIntToUnpaddedBytes(uncleHeader.gasLimit)).toString('hex'),
  //   uncleGasUsed: Buffer.from(bigIntToUnpaddedBytes(uncleHeader.gasUsed)).toString('hex'),
  //   uncleTimestamp: Buffer.from(bigIntToUnpaddedBytes(uncleHeader.timestamp ?? BIGINT_0)).toString('hex'),
  //   uncleExtraData: Buffer.from(uncleHeader.extraData).toString('hex'),
  //   uncleMixHash: Buffer.from(uncleHeader.mixHash).toString('hex'),
  //   uncleNonce: Buffer.from(uncleHeader.nonce).toString('hex'),
  //   uncleBaseFeePerGas: Buffer.from(bigIntToUnpaddedBytes(uncleHeader.baseFeePerGas)).toString('hex'),
  //   uncleWithdrawalsRoot: Buffer.from(uncleHeader.withdrawalsRoot).toString('hex'),
  // }))

  // const uncleHeadersString = Buffer.from((uncleHeadersArr.map(uncleHeader => {
  //   return (`
  //     parentHash: ${uncleHeader.parentHash}
  //     uncleHash: ${uncleHeader.uncleHash}
  //     coinbase: ${uncleHeader.coinbase}
  //     stateRoot: ${uncleHeader.stateRoot}
  //     transactionsTrie: ${uncleHeader.transactionsTrie}
  //     recepitTrie: ${uncleHeader.receiptTrie}
  //     logsBloom: ${uncleHeader.logsBloom}
  //     difficulty: ${uncleHeader.difficulty}
  //     number: ${uncleHeader.number}
  //     gasLimit: ${uncleHeader.gasLimit}
  //     gasUsed: ${uncleHeader.gasUsed}
  //     timeStamp: ${uncleHeader.timestamp}
  //     extraData: ${uncleHeader.extraData}
  //     mixHash: ${uncleHeader.mixHash}
  //     nonce: ${uncleHeader.nonce}
  //     baseFeePerGas: ${uncleHeader.baseFeePerGas}
  //   `);
  // }).join(''))).toString('hex')

    // The Transactions, reconstructed
    // const withdrawalsArr = blockObject.withdrawals.map(withdrawal => ({
    //   address: withdrawal.address,
    //   amount: withdrawal.amount,
    //   index: withdrawal.index,
    //   validatorIndex: withdrawal.validatorIndex,
    // }));

    // console.log(blockObject)

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
  }, [blockObject, blockScale]);

  // const buffer = blockObject.serialize()
  // const sizeInBytes = buffer.length
  // console.log(`Size of "${blockObject}" in bytes: ${sizeInBytes}`)


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
          
          <span id='transactionsString' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{transactionsString}</span>
          {/* <span id='uncleHeadersString' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{uncleHeadersString}</span> */}
          <span id='withdrawalsString' style={{color: getColor(), overflowWrap: 'break-word', width: '100', height: '100'}}>{withdrawalsString}</span>


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
