import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';
import {Block} from '@ethereumjs/block'
import {Buffer} from 'buffer'
import { RLP } from '@ethereumjs/rlp'
import fixtureBlockData from '../../assets/fixtureBlock.json'


const Inputs = ({setBlockInfo, setBlockChainNumber}) => {
  const [blockJsonString, setBlockJsonString] = useState(null);
  const [blockNumber, setBlockNumber] = useState(null)

  const fetchBlock = async () => {
    const infuraAPIKey = document.getElementById('infuraAPIKey').value; // make this like the block number input thing!!
    const provider = new ethers.InfuraProvider(
      'mainnet',
      infuraAPIKey
    )

    try {
      let blockObject
      if (!blockNumber) {
        blockObject = Block.fromBlockData(fixtureBlockData)
        setBlockChainNumber(Number(blockObject.header.number))
      } else {
        setBlockChainNumber(blockNumber)
        blockObject = await Block.fromJsonRpcProvider(provider, `0x${blockNumber.toString(16)}`)
        console.log(blockObject)
      }
        
      const blockBinary = Buffer.from(blockObject.serialize())
      const decodedBlock = RLP.decode(blockBinary)
      setBlockInfo({ decodedBlock })
      setBlockJsonString(JSON.stringify(blockObject.toJSON(), null, 2))

    } catch (error) {
      console.error('Error fetching block:', error.message);
    }
  }

  // on first render
  useEffect(() => {
    fetchBlock()
  }, [])


  return (
    <>
    <div id='inputs' className='inputs'>
      <h2>Inputs</h2>
      <label htmlFor='infuraAPIKey'>Infura API Key: </label>
      <input type='text' id='infuraAPIKey' name='infuraAPIKey' placeholder='Infura API Key'></input>
      <br/>
      <label htmlFor='blockNumber'>Block Number: </label>
      <input
        type='text'
        id='blockNumber'
        name='blockNumber'
        placeholder='Block Number'
        onInput={(event)=> {
          setBlockNumber(parseInt(event.target.value, 10))
        }}
      />
      <br/>
      <button id='fetchBlock' className='fetchBlock' onClick={fetchBlock}>Fetch Block</button>
    </div>
    <div id='blockInfo' className='blockInfo'>
      <h2>Block Info</h2>
      <pre id='block' style={{maxWidth: '600px', wordWrap: 'break-word'}}>{blockJsonString}</pre>
    </div>
    </>
  )
}

export default Inputs