import React, {useState} from 'react';
import Inputs from './Components/UI/Inputs';
import Instructions from './Components/UI/Instructions';
import Poster from './Components/Poster/Poster';
import './App.css';

function App() {
  const [blockChainNumber, setBlockChainNumber] = useState();
  const [blockObject, setBlockObject] = useState(null);

  const handleBlockNumberFromInput = (blockChainNumber) => {
    setBlockChainNumber(blockChainNumber)
  }

  return (
    <>
      <Instructions/>
      <Poster
        blockChainNumberFromApp={blockChainNumber}
        blockObject={blockObject}/>
      <br/>
      <Inputs
        setBlockChainNumber={handleBlockNumberFromInput}
        setBlockObject={setBlockObject}/>
      <br/>
    </>
  );
}

export default App;
