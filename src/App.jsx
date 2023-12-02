import React, {useState} from 'react';
import Inputs from './Components/UI/Inputs';
import Poster from './Components/Poster/Poster';
import './App.css';

function App() {
  const [blockInfo, setBlockInfo] = useState();
  const [blockChainNumber, setBlockChainNumber] = useState(1);

  return (
    <>
      <Poster blockChainNumber= {blockChainNumber} blockInfo = {blockInfo}/>
      <br/>
      <Inputs setBlockChainNumber={setBlockChainNumber} setBlockInfo={setBlockInfo}/>
      <br/>
      
    </>
  );
}

export default App;
