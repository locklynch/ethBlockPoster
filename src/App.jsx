import React, {useState} from 'react';
import Inputs from './Components/UI/Inputs';
import Instructions from './Components/UI/Instructions';
import Poster from './Components/Poster/Poster';
import './App.css';

function App() {
  const [blockInfo, setBlockInfo] = useState();
  const [blockChainNumber, setBlockChainNumber] = useState();
  const [blockJsonString, setBlockJsonString] = useState(null);

  const handleBlockNumberFromInput = (blockChainNumber) => {
    setBlockChainNumber(blockChainNumber)
    // console.log(blockChainNumber)
  }

  return (
    <>
      <Instructions/>
      <Poster
        blockChainNumberFromApp={blockChainNumber}
        blockInfo = {blockInfo}
        blockJsonString={blockJsonString}/>
      <br/>
      <Inputs
        setBlockChainNumber={handleBlockNumberFromInput}
        setBlockInfo={setBlockInfo}
        setBlockJsonString={setBlockJsonString}
        blockJsonString={blockJsonString}/>
      <br/>
    </>
  );
}

export default App;
