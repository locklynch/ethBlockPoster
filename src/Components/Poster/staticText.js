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

  const getColor = useColorPalette()

export default {

    "ethereumjs_execution_block": [
        {
            "id": "parentHash",
            "text": "the hash of the previous execution block",
            "color": getColor() 
        },
        {
            "id": "uncleHash",
            "text": "hash of mined block uncles. Now Deprecated",
            "color": getColor() 
        },
        {
            "id": "coinbase",
            "text": "address of the validator who proposed the block",
            "color": getColor()
        },
        {
            "id": "stateRoot",
            "text": "root hash of global state after block changes",
            "color": getColor()
        },
        {
            "id": "transactionsTrie",
            "text": "root hash of the transactions in the payload",
            "color": getColor()
        },
        {
            "id": "receiptTrie",
            "text": "hash of the transaction receipts trie",
            "color": getColor()
        },
        {
            "id": "logsBloom",
            "text": "data structure containing event logs",
            "color": getColor()
        },
        {
            "id": "difficulty",
            "text": "used to change difficulty in finding a hash",
            "color": getColor()
        },
        {
            "id": "number",
            "text": "number of the current block",
            "color": getColor()
        },
        {
            "id": "gasLimit",
            "text": "maximum gas allowed in this block",
            "color": getColor()
        },
        {
            "id": "gasUsed",
            "text": "actual ammount of gas used in this block",
            "color": getColor()
        },
        {
            "id": "timestamp",
            "text": "the start time of the slot the current block falls within",
            "color": getColor()
        },
        {
            "id": "extraData",
            "text": "arbitrary additional data as raw bytes",
            "color": getColor()
        },
        {
            "id": "mixHash",
            "text": "hash of blockheader that meets difficulty condition",
            "color": getColor()
        },
        {
            "id": "nonce",
            "text": "number used once to help generate hash",
            "color": getColor()
        },
        {
            "id": "baseFeePerGas",
            "text": "the base fee value in Gwei",
            "color": getColor()
        },
        {
            "id": "withdrawalsRoot",
            "text": "root hash of the withdrawals in the payload",
            "color": getColor()
        },
        // {
        //     "id": "blobGasUsed",
        //     "text": "amount of gas consumed by transactions",
        //     "color": getColor()
        // },
        // {
        //     "id": "excessBlobGas",
        //     "text": "running total of blob gas consumed in excess of the target blob gas amount",
        //     "color": getColor()
        // },
        // {
        //     "id": "parentBeaconBlockRoot",
        //     "text": "hash of the Beacon Chain Block the current execution block belongs to",
        //     "color": getColor()
        // },
        {
            "id": "prevRandao",
            "text": "value used in random validator selection",
            "color": getColor()
        },
        {
            "id": "transactions",
            "text": "list of transactions to be executed",
            "color": getColor()
        },
        // {
        //     "id": "uncleHeaders",
        //     "text": "valid but stale blocks related to current block",
        //     "color": getColor()
        // },
        {
            "id": "withdrawals",
            "text": "list of withdrawal objects",
            "color": getColor()
        }
    ]
}