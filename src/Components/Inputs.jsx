import React, { useState } from 'react';
import Web3 from 'web3';

const Inputs = () => {
  // State to manage input values
  const [apiKey, setApiKey] = useState('');
  const [blockNumber, setBlockNumber] = useState('');
  const [blockInfo, setBlockInfo] = useState('');

  // const getBlockInfo = () => {
  //   return blockInfo;
  // }

  const convertBigIntToString = (obj) => {
    // Recursively convert all BigInt values to strings
    const recursiveConvert = (value) => {
      if (typeof value === 'bigint') {
        return value.toString();
      } else if (typeof value === 'object' && value !== null) {
        // Recursively process nested objects or arrays
        for (const key in value) {
          value[key] = recursiveConvert(value[key]);
        }
      }
      return value;
    };
  
    // Convert BigInt values recursively in the entire object
    return recursiveConvert(obj);
  };

  const fetchBlock = () => {
    // Check if the API key is provided
    if (!apiKey) {
      console.error('Infura API Key is required.');
      return;
    }
  
    // Connect to a Web3 provider with the provided API key
    const web3 = new Web3(`https://mainnet.infura.io/v3/${apiKey}`);
  
    // Fetch the block
    web3.eth.getBlock(blockNumber)
    .then(block => {
      // Convert all BigInt values in the block to strings
      const blockWithConvertedValues = convertBigIntToString(block);
    
      // Display the entire block using blockWithConvertedValues as the source
      setBlockInfo(JSON.stringify(blockWithConvertedValues, null, 2));
    
      // Log the block after it has been fetched
      console.log(blockWithConvertedValues);
    })
    
      .catch(error => {
        console.error(error);
        setBlockInfo('Error fetching block information.');
      });
  };

  return (
    <div className="input-cell">
      {/* Label */}
      <text x="100" y="25" textAnchor="middle" fontSize="16" fill="#FFFFFF">
        Inputs: 
      </text>
      <br/>

      {/* Input Fields */}
      <label htmlFor="infuraApiKey">Infura API Key:</label>
      <input
        type="text"
        id="infuraApiKey"
        placeholder="Enter API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        style={{width: '250px'}}
      />
      <br/>

      <label htmlFor="blockNumber">Block Number:</label>
      <input
        type="text"
        id="blockNumber"
        placeholder="Enter Block Number"
        value={blockNumber}
        onChange={(e) => setBlockNumber(e.target.value)}
        style={{width: '250px'}}
      />
      <br/>

      {/* Retrieve Block Button */}
      <button onClick={fetchBlock}>Retrieve Block</button>
      <br/>
      <br/>
      {/* Display Block Information */}
      <label htmlFor="blockInfo">Block Info</label>
      <div id="blockInfo" style={{ maxWidth: '500px'}}>
        {blockInfo}
      </div>
    </div>
  );
};

export default Inputs;
// export {getBlockInfo};