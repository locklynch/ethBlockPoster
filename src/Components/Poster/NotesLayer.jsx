// layer for notes about the block

import React, { useState, useEffect, useRef } from "react";
import { DrapAndDropComponent } from './DragAndDrop';
import { ethereumjs_execution_block } from '../../assets/staticText.json';
import useResizeAndScrollEffect from "./ResizeAndScrollHelper";
import BlockUtils from './BlockUtils'

const NotesLayer = ({blockObject, setNoteToRect}) => {
  const [contentWidth, setContentWidth] = useState(100);
  const textRefs = ethereumjs_execution_block.map (() => useRef());
  const lineRefs = ethereumjs_execution_block.map (() => useRef());

  //starting position of note boxes
  const x = 150
  const y = 100
  const deltaX = 200

  useEffect(() => {
    const newWidths = {};
    ethereumjs_execution_block.forEach((note, index) => {
      const textRef = textRefs[index]
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        newWidths[index] = rect.width + 30
      }
    });
    setContentWidth(newWidths);
  }, [blockObject]);

  lineRefs.forEach((lineRef, index) => {
    const note = ethereumjs_execution_block[index]
    useResizeAndScrollEffect(lineRef, (rect) => setNoteToRect(note.id, rect))
  })

  const blockHeaderUtils = BlockUtils(blockObject)

  return (
    <g>
      {blockObject && ethereumjs_execution_block.map((note, index) => (
        <DrapAndDropComponent key={note.id} style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'white'}}>
          <rect
            stroke="white"
            strokeWidth={2}
            // x={x + (index % 2 === 0 ? 0 : deltaX)} // old stagger display
            x={x + (index*15)}
            y={y + (52 * index)}
            width={contentWidth[index]}
            height={40}
            fill="black"
            fillOpacity={'40%'}
            ref={lineRefs[index]}
          />
          <text
            id={'id-${$note.index}'}
            // x={x + 10 + (index % 2 === 0 ? 0 : deltaX)} // old stagger display
            x={x + 10 + (index*15)}
            y={y + 18 + (52 * index)}
            fill="white"
            fontSize="18"
          >{note.id}:</text>
          <text
            ref={textRefs[index]}
            id='note-{$note.index}'
            // x={x + 20 + (index % 2 === 0 ? 0 : deltaX)} // old stagger display
            x={x + 20 + (index*15)}
            y={y + 35 + (52 * index)}
            fill="white"
            fontSize="15"
          >{note.text}</text>
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