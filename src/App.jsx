import React, {useState} from 'react';
import Inputs from './Components/UI/Inputs';
import Instructions from './Components/UI/Instructions';
import Poster from './Components/Poster/Poster';
import './App.css';

function App() {
  const [blockInfo, setBlockInfo] = useState();
  const [blockChainNumber, setBlockChainNumber] = useState();

  const handleBlockNumberFromInput = (blockChainNumber) => {
    setBlockChainNumber(blockChainNumber)
    console.log(blockChainNumber)
  }

  return (
    <>
      <Instructions/>
      <Poster blockChainNumberFromApp={blockChainNumber} blockInfo = {blockInfo}/>
      <br/>
      <Inputs setBlockChainNumber={handleBlockNumberFromInput} setBlockInfo={setBlockInfo}/>
      <br/>
    </>
  );
}

export default App;
