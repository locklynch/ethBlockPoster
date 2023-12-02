// Poster.jsx
import React from 'react';
import BlockData from './BlockData';
import { DrapAndDropComponent } from './DragAndDrop';
import { infoNotes } from '../../assets/staticText.json';
import BlockChain from './BlockChain';

const Poster = ({ blockInfo, blockChainNumber }) => {

  // console.log(notes);

  return (
    <div className="poster">
      <div className="poster-container">
      <svg key="posterWindow" width="1000" height="1414" viewBox="0 0 1000 1414" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect key="renderWindow" width="1000" height="1414" fill="#1E1E1E"/>
        <DrapAndDropComponent>
          {blockInfo && <BlockData blockInfo={blockInfo}/>}
        </DrapAndDropComponent>
        {infoNotes.map((note, index,) => (
          <DrapAndDropComponent key={note.id} style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'white'}}>
            <text x="330" y={80 + 20 * index} fill="white" fontSize="20">{note.text}</text>
          </DrapAndDropComponent>
        ))}
        <DrapAndDropComponent>
          <BlockChain blockChainNumber={blockChainNumber}/>
        </DrapAndDropComponent>
      </svg>
      </div>
    </div>
  );
};
export default Poster;
