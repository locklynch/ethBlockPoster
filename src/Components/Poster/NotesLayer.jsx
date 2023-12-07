// layer for notes about the block

import React, { useState, useEffect, useRef } from "react";
import { DrapAndDropComponent } from './DragAndDrop';
import { execution_payload_header } from '../../assets/staticText.json';

const NotesLayer = (blockInfo) => {
  const [contentWidth, setContentWidth] = useState(100);
  const textRef = useRef(null)

  useEffect(() => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setContentWidth(rect.width)
      // console.log(rect)
    };
  }, []);

  return (
    <g>
      {blockInfo && execution_payload_header.map((note, index) => (
        <DrapAndDropComponent key={note.id} style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'white'}}>
          <rect
            stroke="white"
            strokeWidth={2}
            x={"345"}
            y={85+(40 * index)}
            width={contentWidth}
            height={40}
            fill="black"
            fillOpacity={'50%'}
          />
          <text
            id={'id-${$note.index}'}
            x="350"
            y={100 + (40 * index)}
            fill="white"
            fontSize="16"
          >{note.id}:</text>
          <text
            ref={textRef}
            id='note-{$note.index}'
            x="350"
            y={120 + (40 * index)}
            fill="white"
            fontSize="16"
          >{note.text}</text>
        </DrapAndDropComponent>
      ))}
    </g>
  )
}

export default NotesLayer