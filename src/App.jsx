import React from 'react';
import Inputs from './Components/Inputs';
import Poster from './Components/Poster';
import './App.css';
import { BlockInfoProvider } from './Components/BlockInfoContext';

function App() {


  return (
    <>
    <BlockInfoProvider>
      <Poster/>
      <br/>
      <Inputs/>
      <br/>
      
    </BlockInfoProvider>
    </>
  );
}

export default App;
