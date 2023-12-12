// layer for notes about the block

import React, { useState, useEffect, useRef } from "react";
import { DrapAndDropComponent } from './DragAndDrop';
import { ethereumjs_execution_block } from '../../assets/staticText.json';

const NotesLayer = (blockInfo, blockJsonString) => {
  const [contentWidth, setContentWidth] = useState(100);
  const textRefs = useRef(ethereumjs_execution_block.map (() => React.createRef()));

  //starting position of note boxes
  const x = 250
  const y = 100
  const deltaX = 200

  useEffect(() => {
    const newWidths = {};
    ethereumjs_execution_block.forEach((note, index) => {
      const textRef = textRefs.current[index]
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        newWidths[index] = rect.width + 30
      }
    });
    setContentWidth(newWidths);
  }, [blockInfo]);
  console.log('blockJsonString:', blockJsonString)

  return (
    <g>
      {blockInfo && ethereumjs_execution_block.map((note, index, blockJsonString) => (
        <DrapAndDropComponent key={note.id} style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'white'}}>
          <rect
            stroke="white"
            strokeWidth={2}
            x={x + (index % 2 === 0 ? 0 : deltaX)}
            y={y + (60 * index)}
            width={contentWidth[index]}
            height={40}
            fill="black"
            fillOpacity={'40%'}
          />
          <text
            id={'id-${$note.index}'}
            x={x + 10 + (index % 2 === 0 ? 0 : deltaX)}
            y={y + 15 + (60 * index)}
            fill="white"
            fontSize="16"
          >{note.id}:</text>
          <text
            ref={textRefs.current[index]}
            id='note-{$note.index}'
            x={x + 20 + (index % 2 === 0 ? 0 : deltaX)}
            y={y + 35 + (60 * index)}
            fill="white"
            fontSize="16"
          >{note.text}</text>
          <text
              x={x + 10 + (index % 2 === 0 ? 0 : deltaX)}  // Adjust x position for the value text
              y={y + 55 + (60 * index)}  // Adjust y position for the value text
              fill="white"
              fontSize="14"
            >{blockJsonString[note.id]}</text>
        </DrapAndDropComponent>
      ))}
    </g>
  )
}

export default NotesLayer