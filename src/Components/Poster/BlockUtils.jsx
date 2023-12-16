// helper function for distributing the parsed block data to both BlockData and NotesLayer

import { useRef } from 'react'
import { bigIntToUnpaddedBytes } from '@ethereumjs/util'
import {Buffer} from 'buffer'

const BlockUtils = (blockObject) => {

  const valueToHex = (value) => value === undefined ? false : Buffer.from(value).toString('hex')
  const addressToHex = (value) => value === undefined ? false : Buffer.from(value.bytes).toString('hex')
  const bigIntToHex = (value) => value === undefined ? false : Buffer.from(bigIntToUnpaddedBytes(value)).toString('hex')

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
  
  return (blockHeaderUtils)
};

export default BlockUtils