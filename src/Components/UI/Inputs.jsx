import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';
import {Block} from '@ethereumjs/block'
import {Buffer} from 'buffer'
import { RLP } from '@ethereumjs/rlp'
import fixtureBlockData from '../../assets/fixtureBlock.json'


const Inputs = ({setBlockInfo, setBlockChainNumber}) => {
  const [blockJsonString, setBlockJsonString] = useState(null);

  const fetchBlock = async () => {
    const blockNumber = parseInt(document.getElementById('blockNumber').value);
    const infuraAPIKey = document.getElementById('infuraAPIKey').value;
    const provider = new ethers.InfuraProvider(
      'mainnet',
      infuraAPIKey
    )
    let blockChainNumber = 1

    try {
      let blockObject
      if (!blockNumber) {
        blockObject = Block.fromRPC(fixtureBlockData) // CHANGE THIS!!!! right now this is not equivilant to the blockObject when it gets fetched
      } else {
        blockChainNumber = blockNumber
        setBlockChainNumber(blockChainNumber)
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

  // // on first render
  // useEffect(() => {
  //   fetchBlock()
  // }, [])


  return (
    <>
    <div id='inputs'>
      <h2>Inputs</h2>
      <label htmlFor='infuraAPIKey'>Infura API Key: </label>
      <input type='text' id='infuraAPIKey' name='infuraAPIKey' placeholder='Infura API Key'></input>
      <br/>
      <label htmlFor='blockNumber'>Block Number: </label>
      <input type='text' id='blockNumber' name='blockNumber' placeholder='Block Number'></input>
      <br/>
      <button id='fetchBlock' onClick={fetchBlock}>Fetch Block</button>
    </div>
    <div id='blockInfo'>
      <h2>Block Info</h2>
      <pre id='block' style={{maxWidth: '600px', wordWrap: 'break-word'}}>{blockJsonString}</pre>
    </div>
    </>
  )
}

export default Inputs