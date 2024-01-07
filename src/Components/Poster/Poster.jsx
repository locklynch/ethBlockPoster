// Poster.jsx

import React, { useState, useRef } from 'react';
import BlockData from './BlockData';
import BlockHeader from './BlockHeader.jsx';
import { DrapAndDropComponent } from './DragAndDrop';
import BlockChain from './BlockChain';
import Lines from './LinesToBlock';
import NotesLayer from './NotesLayer';
import useResizeAndScrollEffect from './ResizeAndScrollHelper';
import NoteLine from './LinesToNotes';
import notesText from './staticText.js';
import "../../App.css";

const theNotes = notesText.ethereumjs_execution_block

const useNotesController  = (posterRect) => {
  const [noteState, setNoteState] = useState({})
  const [transactionStringRect, setTransactionStringRect] = useState(null);
  const [withdrawalStringRect, setWithdrawalStringRect] = useState(null);

  const set = (id, type, rect) => {
    // console.log(id, type, rect)
    setNoteState(oldState => {
      return {
        ...oldState,
        [id]: {
          ...oldState[id],
          [type]: rect,
        }
      }
    })
  }

  const setTo = (id, rect) => {
    set(id, 'to', rect)
  }
  const setFrom = (id, rect) => {
    set(id, 'from', rect)
  }

  const render = () => {
    return React.createElement(React.Fragment, null, Object.entries(noteState).map(([id, rects]) => {
      const { to, from } = rects
      const noteProp = theNotes.find(prop => prop.id === id)
  
      const color = noteProp ? noteProp.color : 'white'

      return (
        <NoteLine
          key={'noteline'+id}
          noteFromRect={from}
          noteToRect={to}
          posterRect={posterRect}
          transactionStringRect={transactionStringRect}
          withdrawalStringRect={withdrawalStringRect}
          color={color} />
      )
    }))
  }

  return {
    setTo,
    setFrom,
    noteState,
    setTransactionStringRect,
    setWithdrawalStringRect,
    render,
  }
}

const Poster = ({ blockChainNumberFromApp, blockObject }) => {
  const [fromRect, setFromRect] = useState ()
  const [toRect, setToRect] = useState ()
  const [posterRect, setPosterRect] = useState()
  const posterRef = useRef(null)
  const [blockScale, setBlockScale] = useState(0.27)
  const [svgPreview, setSvgPreview] = useState()
  const [isToggled, setToggled] = useState(true)

  const {
    setTo,
    setFrom,
    noteState,
    setTransactionStringRect,
    setWithdrawalStringRect,
    render: renderPolygons,
  } = useNotesController(posterRect)

  useResizeAndScrollEffect(posterRef, setPosterRect)

  const sendBlockScale = () => {
    let blockScale = document.getElementById('setBlockScale').value;
    setBlockScale(blockScale)
  }

  const previewPoster = () => {
    const svg = posterRef.current.outerHTML;
    const encodedSVG = btoa(svg);
    const imgSrc = `data:image/svg+xml;base64,${encodedSVG}`;
    setSvgPreview(imgSrc)
  }

  const downloadSVG = () => {
    const svg = posterRef.current.outerHTML;
    const blob = new Blob([svg], { type: 'image/svg+xml'});
    const element = document.createElement("a");
    element.download = "poster.svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    window.URL.revokeObjectURL(element.href);
    element.remove();
  }

  const handleSetBlockScale = (event) => {
    if (event.key === 'Enter') {
      sendBlockScale();
    }
  }

  const handleToggleChange = () => {
    setToggled(!isToggled)
  }

  const transSwitch = () => {
    return (
      <label className='switch'>
          <input type='checkbox'
            checked={!isToggled}
            onChange={handleToggleChange}
            id='includeTranstions'
          />
          <span className='slider'/>
        </label>
    )
  }

  return (
    <div className="poster">
      <div className="poster-container" id='poster-container'>
        <svg
          ref={posterRef}
          key="posterWindow"
          className='poster-itself'
          width="1000"
          height="1414"
          viewBox="0 0 1000 1414"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            fontFamily: 'system-ui',
            lineHeight: '1'
          }}
        >
          <rect key="renderWindow" width="1000" height="1414" fill="#1E1E1E"/>
          <DrapAndDropComponent>
            {blockChainNumberFromApp && <BlockChain blockChainNumberFromApp={blockChainNumberFromApp} setBlockPosition={setFromRect}/>}
          </DrapAndDropComponent>
          <Lines
            fromRect={fromRect}
            toRect={toRect}
            posterRect={posterRect}
          />
          <DrapAndDropComponent>
            {blockObject && blockChainNumberFromApp && <BlockData
              blockChainNumberFromApp={blockChainNumberFromApp}
              setBlockPosition={setToRect}
              blockScale={blockScale}
              blockObject={blockObject}
              // setNoteFromRect={setFrom}
              isToggled={isToggled}
              setTransactionStringRect={setTransactionStringRect}
              setWithdrawalStringRect={setWithdrawalStringRect}
            />}
          </DrapAndDropComponent>
          <DrapAndDropComponent>
            {blockObject && <BlockHeader
              blockChainNumberFromApp={blockChainNumberFromApp}
              blockObject={blockObject}
              blockScale={blockScale}
              setNoteFromRect={setFrom}
            />}
          {renderPolygons()}
          </DrapAndDropComponent>
          {blockObject && <NotesLayer
            blockObject={blockObject}
            setNoteToRect={setTo}
            isToggled={isToggled}
          />}
        </svg>
        <br/>
        {svgPreview && <img src={svgPreview}/>}
      </div>
      <br/>
      <label htmlFor='setBlockScale'>Set Block Scale: </label>
      <input type='number' id='setBlockScale' name='setBlockScale' placeholder='0.27' onKeyDown={handleSetBlockScale}/>
      <button id='setBlockScaleButton' className='setBlockScaleButton' onClick={sendBlockScale}>Rescale Block</button>
      <br/>
      <label className='transAndWithdrawalSwitchLabel' htmlFor='includeTransactions'>Include Transactions and Widthrawals: </label>
        {transSwitch()}
      <br/>
      {/* <button id='previewPoster' className='previewPoster' onClick={previewPoster}>Preview Poster</button> */}
      <button id='downloadSVG' className='downloadSVG' onClick={downloadSVG}>Download Poster</button>
    </div>
  );
};
export default Poster;
