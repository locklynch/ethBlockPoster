// layer for notes about the block

import React from "react";
import { DrapAndDropComponent } from './DragAndDrop';
import { execution_payload_header } from '../../assets/staticText.json';

const NotesLayer = (blockInfo) => {
  // console.log(blockInfo)
  return (
    <g>
      {blockInfo && execution_payload_header.map((note, index) => (
        <DrapAndDropComponent key={note.id} style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'white'}}>
          <text
            id={note.key}
            x="350"
            y={100 + (40 * index)}
            fill="white"
            fontSize="16"
          >{note.text}</text>
        </DrapAndDropComponent>
      ))}
    </g>
  )
}

export default NotesLayer