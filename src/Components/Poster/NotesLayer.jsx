// layer for notes about the block

import React, { useState, useEffect, useRef } from "react";
import { DrapAndDropComponent } from './DragAndDrop';
import notesText from './staticText.js';
import useResizeAndScrollEffect from "./ResizeAndScrollHelper";
import BlockUtils from './BlockUtils'

const theNotes = notesText.ethereumjs_execution_block

const NotesLayer = ({blockObject, setNoteToRect, isToggled}) => {
  const [contentWidth, setContentWidth] = useState(100);
  const textRefs = notesText.ethereumjs_execution_block.map (() => useRef());
  const lineRefs = notesText.ethereumjs_execution_block.map (() => useRef());

  //starting position of note boxes
  const x = 20
  const y = 40
  const deltaX = 200
  const xSpread = 0
  const ySpread = 68
  

  useEffect(() => {
    const newWidths = {};
    notesText.ethereumjs_execution_block.forEach((note, index) => {
      const textRef = textRefs[index]
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        newWidths[index] = rect.width + 30
      }
    });
    setContentWidth(newWidths);
  }, [blockObject]);

  lineRefs.forEach((lineRef, index) => {
    const note = notesText.ethereumjs_execution_block[index]
    useResizeAndScrollEffect(lineRef, (rect) => setNoteToRect(note.id, rect))
  })

  const blockHeaderUtils = BlockUtils(blockObject)

  return (
    <g>
      {blockObject && notesText.ethereumjs_execution_block.map((theNotes, index) => (
        <DrapAndDropComponent key={theNotes.id} style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: theNotes.color}}>
          <rect
            stroke='white'
            strokeWidth={2}
            // x={x + (index % 2 === 0 ? 0 : deltaX)} // old stagger display
            x={x + (index*xSpread)}
            y={y + (ySpread * index)}
            width={contentWidth[index]}
            height={45}
            fill="black"
            fillOpacity={'90%'}
            ref={lineRefs[index]}
          />
          <text
            id={'id-${$note.index}'}
            // x={x + 10 + (index % 2 === 0 ? 0 : deltaX)} // old stagger display
            x={x + 10 + (index*xSpread)}
            y={y + 23 + (ySpread * index)}
            fill={theNotes.color}
            fontSize="26"
          >{theNotes.id}:</text>
          <text
            ref={textRefs[index]}
            id='note-{$note.index}'
            // x={x + 20 + (index % 2 === 0 ? 0 : deltaX)} // old stagger display
            x={x + 20 + (index*xSpread)}
            y={y + 38 + (ySpread * index)}
            fill={theNotes.color}
            fontSize="15"
          >{theNotes.text}</text>
          {/* {blockHeaderUtils && <text
              x={x + 10 + (index % 2 === 0 ? 0 : deltaX)}
              y={y + 55 + (60 * index)}
              fill="white"
              fontSize="14"
            >{(blockHeaderUtils[note.id].value)}</text>} */}
        </DrapAndDropComponent>
      ))}
    </g>
  )
}

export default NotesLayer