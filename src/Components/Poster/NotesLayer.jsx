// layer for notes about the block

import React, { useState, useEffect, useRef, useContext } from "react";
import { DrapAndDropComponent } from './DeprecatedComponents/DragAndDrop';
// import notesText from './staticText.js';
import useResizeAndScrollEffect from "./DeprecatedComponents/ResizeAndScrollHelper";
import BlockUtils from './BlockUtils'
import { makeGetColor } from './ColorUtils'
import { ThemeContext, getPalette } from './GlobalColorPalette';

const NotesLayer = ({blockObject, setNoteToRect, isToggled}) => {
  const [contentWidth, setContentWidth] = useState(100);

  const theme = useContext(ThemeContext);
  const palette = getPalette(theme);
  const getColor = makeGetColor(palette);

  const theNotes = [
    {
        "id": "parentHash",
        "text": "the hash of the previous execution block",
        "color": getColor() 
    },
    // {
    //     "id": "uncleHash",
    //     "text": "hash of mined block uncles. Now Deprecated",
    //     "color": getColor()
    // },
    {
        "id": "coinbase",
        "text": "address of the validator who proposed the block",
        "color": getColor()
    },
    {
        "id": "stateRoot",
        "text": "root hash of global state after block changes",
        "color": getColor()
    },
    {
        "id": "transactionsTrie",
        "text": "root hash of the transactions in the payload",
        "color": getColor()
    },
    {
        "id": "receiptTrie",
        "text": "hash of the transaction receipts trie",
        "color": getColor()
    },
    {
        "id": "logsBloom",
        "text": "data structure containing event logs",
        "color": getColor()
    },
    // {
    //     "id": "difficulty",
    //     "text": "used to change difficulty in finding a hash",
    //     "color": getColor()
    // },
    {
        "id": "number",
        "text": "number of the current block",
        "color": getColor()
    },
    {
        "id": "gasLimit",
        "text": "maximum gas allowed in this block",
        "color": getColor()
    },
    {
        "id": "gasUsed",
        "text": "actual ammount of gas used in this block",
        "color": getColor()
    },
    {
        "id": "timestamp",
        "text": "the start time of the slot the current block falls within",
        "color": getColor()
    },
    {
        "id": "extraData",
        "text": "arbitrary additional data as raw bytes",
        "color": getColor()
    },
    {
        "id": "mixHash",
        "text": "hash of blockheader that meets difficulty condition",
        "color": getColor()
    },
    // {
    //     "id": "nonce",
    //     "text": "number used once to help generate hash",
    //     "color": getColor()
    // },
    {
        "id": "baseFeePerGas",
        "text": "the base fee value in Gwei",
        "color": getColor()
    },
    {
        "id": "withdrawalsRoot",
        "text": "root hash of the withdrawals in the payload",
        "color": getColor()
    },
    // {
    //     "id": "blobGasUsed",
    //     "text": "amount of gas consumed by transactions",
    //     "color": getColor()
    // },
    // {
    //     "id": "excessBlobGas",
    //     "text": "running total of blob gas consumed in excess of the target blob gas amount",
    //     "color": getColor()
    // },
    // {
    //     "id": "parentBeaconBlockRoot",
    //     "text": "hash of the Beacon Chain Block the current execution block belongs to",
    //     "color": getColor()
    // },
    {
        "id": "prevRandao",
        "text": "value used in random validator selection",
        "color": getColor()
    },
    // {
    //     "id": "transactions",
    //     "text": "list of transactions to be executed",
    //     "color": getColor()
    // },
    // {
    //     "id": "uncleHeaders",
    //     "text": "valid but stale blocks related to current block",
    //     "color": getColor()
    // },
    // {
    //     "id": "withdrawals",
    //     "text": "list of withdrawal objects",
    //     "color": getColor()
    // }
  ]

  const textRefs = theNotes.map (() => useRef());
  const lineRefs = theNotes.map (() => useRef());

  //starting position of note boxes
  const x = 20
  const y = 30
  const deltaX = 200
  const xSpread = 0
  const ySpread = 92
  

  useEffect(() => {
    const newWidths = {};
    theNotes.forEach((note, index) => {
      const textRef = textRefs[index]
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        newWidths[index] = rect.width <= 150 ? rect.width + 60 : rect.width+ 15;
      }
    });
    setContentWidth(newWidths);
  }, [blockObject]);

  lineRefs.forEach((lineRef, index) => {
    const note = theNotes[index]
    useResizeAndScrollEffect(lineRef, (rect) => setNoteToRect(note.id, rect))
  })

  const blockHeaderUtils = BlockUtils(blockObject)

  return (
    <g className="hidden">
      {blockObject && theNotes.map((theNotes, index) => (
        <DrapAndDropComponent key={theNotes.id} style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: theNotes.color}}>
          <rect
            stroke='white'
            strokeWidth={2}
            // x={x + (index % 2 === 0 ? 0 : deltaX)} // old stagger display
            x={x + (index*xSpread)}
            y={y + (ySpread * index)}
            width={contentWidth[index]}
            height={50}
            fill="black"
            fillOpacity={'80%'}
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
          {/* <text
            id='note-{$note.index}'
            // x={x + 20 + (index % 2 === 0 ? 0 : deltaX)} // old stagger display
            x={x + 20 + (index*xSpread)}
            y={y + 38 + (ySpread * index)}
            fill={theNotes.color}
            fontSize="15"
          >
            {theNotes.text}
          </text> */}
          {blockHeaderUtils && <text
              ref={textRefs[index]}
              x={x + 10 + (index*xSpread)}
              y={y + 45 + (ySpread * index)}
              fill={theNotes.color}
              fontSize="26"
            >
              {blockHeaderUtils[theNotes.id].value?.length > 30
                ? blockHeaderUtils[theNotes.id].value.substring(0, 30) + '...'
                : blockHeaderUtils[theNotes.id].value}
            </text>}
        </DrapAndDropComponent>
      ))}
    </g>
  )
}

export default NotesLayer