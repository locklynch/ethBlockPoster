import React, {useState} from 'react';
import Inputs from './Components/UI/Inputs';
import Poster from './Components/Poster/Poster';
import './App.css';

function App() {
  const [blockInfo, setBlockInfo] = useState();

  return (
    <>
      <Poster blockInfo = {blockInfo}/>
      <br/>
      <Inputs setBlockInfo={setBlockInfo}/>
      <br/>
      
    </>
  );
}

export default App;
