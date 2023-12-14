// Poster.jsx

import React, { useState, useRef } from 'react';
import BlockData from './BlockData';
import { DrapAndDropComponent } from './DragAndDrop';
import BlockChain from './BlockChain';
import Lines from './LinesToBlock';
import NotesLayer from './NotesLayer';
import useResizeAndScrollEffect from './ResizeAndScrollHelper';
import NoteLine from './NoteLine';

const useNotesController  = (posterRect) => {
  const [noteState, setNoteState] = useState({})

  const set = (id, type, rect) => {
    console.log(id, type, rect)
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
      // console.log(id, rects, posterRect)
      if (!posterRect || !to || !from) return
      console.log('rendering note line', id)
      return (
        <NoteLine noteFromRect={from} noteToRect={to} posterRect={posterRect}/>
      )
    }))
  }

  return {
    setTo,
    setFrom,
    noteState,
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
  // const [noteFromRect, setNoteFromRect] = useState ()
  // const [noteToRect, setNoteToRect] = useState()
  const {
    setTo,
    setFrom,
    noteState,
    render,
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
          <Lines fromRect={fromRect} toRect={toRect} posterRect={posterRect}/>
          <DrapAndDropComponent>
            {blockObject && blockChainNumberFromApp && <BlockData
              blockChainNumberFromApp={blockChainNumberFromApp}
              setBlockPosition={setToRect}
              blockScale={blockScale}
              blockObject={blockObject}
              setNoteFromRect={setFrom}
            />}
          </DrapAndDropComponent>

              {'X'}
              {render()}
              {/* {React.createElement('span', null, 'fuck')} */}
              {'z'}

          <NotesLayer
            blockObject={blockObject}
            setNoteToRect={setTo}
          />
        </svg>
        <br/>
        {svgPreview && <img src={svgPreview}/>}
      </div>
      <br/>
      <label htmlFor='setBlockScale'>Set Block Scale: </label>
      <input type='number' id='setBlockScale' name='setBlockScale' placeholder='0.27' onKeyDown={handleSetBlockScale}/>
      <button id='setBlockScaleButton' className='setBlockScaleButton' onClick={sendBlockScale}>Rescale Block</button>
      <br/>
      <button id='previewPoster' className='previewPoster' onClick={previewPoster}>Preview Poster</button>
      <button id='downloadSVG' className='downloadSVG' onClick={downloadSVG}>Download Poster</button>
    </div>
  );
};
export default Poster;
