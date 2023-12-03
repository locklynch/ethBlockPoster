// Poster.jsx
import React from 'react';
import BlockData from './BlockData';
import { DrapAndDropComponent } from './DragAndDrop';
import { infoNotes } from '../../assets/staticText.json';
import BlockChain from './BlockChain';
// import Ethereum_Logo_2014 from '../../assets/Ethereum_logo_2014.svg'

const Poster = ({ blockInfo, blockChainNumberFromApp }) => {

  // console.log(notes);

  return (
    <div className="poster">
      <div className="poster-container">
      <svg key="posterWindow" width="1000" height="1414" viewBox="0 0 1000 1414" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect key="renderWindow" width="1000" height="1414" fill="#1E1E1E"/>
        <DrapAndDropComponent>
          {blockChainNumberFromApp && <BlockChain blockChainNumberFromApp={blockChainNumberFromApp}/>}
        </DrapAndDropComponent>
        <DrapAndDropComponent>
          {blockInfo && blockChainNumberFromApp && <BlockData blockInfo={blockInfo} blockChainNumberFromApp={blockChainNumberFromApp}/>}
          {/* {blockInfo && <image  width='1000' height='1000' x='50' y='150' href={Ethereum_Logo_2014} opacity='20%'/>} */}
        </DrapAndDropComponent>
        {blockInfo && infoNotes.map((note, index,) => (
          <DrapAndDropComponent key={note.id} style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'white'}}>
            <text x="350" y={100 + (40 * index)} fill="white" fontSize="16">{note.text}</text>
          </DrapAndDropComponent>
        ))}
      </svg>
      </div>
    </div>
  );
};
export default Poster;
