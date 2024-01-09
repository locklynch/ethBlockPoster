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
      <Inputs
        setBlockChainNumber={handleBlockNumberFromInput}
        setBlockObject={setBlockObject}
      />
      <br/>
      <Poster
        blockChainNumberFromApp={blockChainNumber}
        blockObject={blockObject}
      />
      <br/>
      <Instructions/>
      <br/>
    </>
  );
}

export default App;
