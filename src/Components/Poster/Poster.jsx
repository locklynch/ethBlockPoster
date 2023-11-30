// Poster.jsx
import React from 'react';
import BlockData from './BlockData';
import { DrapAndDropComponent } from './DragAndDrop';
import { notes } from '../../assets/staticText.json';

const Poster = ({ blockInfo }) => {

  // console.log(notes);

  return (
    <div className="poster">
      <div className="poster-container">
      <svg width="1000" height="1414" viewBox="0 0 1000 1414" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="1000" height="1414" fill="#1E1E1E"/>
        <DrapAndDropComponent>
          {blockInfo && <BlockData blockInfo={blockInfo}/>}
        </DrapAndDropComponent>
        {notes.map((note, index) => (
          <DrapAndDropComponent>
            <text key={note.id} x="330" y={60 + 20 * index} fill="white" fontSize="20">{note.text}</text>
          </DrapAndDropComponent>
        ))}
      </svg>
      </div>
    </div>
  );
};
export default Poster;
