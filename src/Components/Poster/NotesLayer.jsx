// layer for notes about the block

import React, { useState, useEffect, useRef } from "react";
import { DrapAndDropComponent } from './DragAndDrop';
import { execution_payload_header } from '../../assets/staticText.json';

const NotesLayer = (blockInfo) => {
  const [contentWidth, setContentWidth] = useState(100);
  const textRefs = useRef(execution_payload_header.map (() => React.createRef()));

  useEffect(() => {
    const newWidths = {};
    execution_payload_header.forEach((note, index) => {
      const textRef = textRefs.current[index]
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        newWidths[index] = rect.width + 30
        // console.log(newWidths)
      }
    });
    setContentWidth(newWidths);
    // if (textRef.current) {
    //   const rect = textRef.current.getBoundingClientRect();
    //   setContentWidth(rect.width)
    // };
  }, [blockInfo]);

  return (
    <g>
      {blockInfo && execution_payload_header.map((note, index) => (
        <DrapAndDropComponent key={note.id} style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'white'}}>
          <rect
            stroke="white"
            strokeWidth={2}
            x={"500"}
            y={200+(60 * index)}
            width={contentWidth[index]}
            height={40}
            fill="black"
            fillOpacity={'50%'}
          />
          <text
            id={'id-${$note.index}'}
            x="510"
            y={215 + (60 * index)}
            fill="white"
            fontSize="16"
          >{note.id}:</text>
          <text
            ref={textRefs.current[index]}
            id='note-{$note.index}'
            x="520"
            y={235 + (60 * index)}
            fill="white"
            fontSize="16"
          >{note.text}</text>
        </DrapAndDropComponent>
      ))}
    </g>
  )
}

export default NotesLayer