// Poster.jsx

import React, { useState, useRef, useEffect } from 'react';
import BlockData from './BlockData';
import { DrapAndDropComponent } from './DragAndDrop';
import BlockChain from './BlockChain';
import Lines from './Lines';
import NotesLayer from './NotesLayer';
import useResizeAndScrollEffect from './ResizeAndScrollHelper';

const Poster = ({ blockInfo, blockChainNumberFromApp }) => {
  const [fromRect, setFromRect] = useState ()
  const [toRect, setToRect] = useState ()
  const [posterRect, setPosterRect] = useState()
  const posterRef = useRef(null)

  useResizeAndScrollEffect(posterRef, setPosterRect)

  function downloadSVG() {
    const svg = document.getElementById('poster-container').innerHTML;
    const encodedSvg = encodeURIComponent(svg);
    const blob = new Blob([encodedSvg], { type: 'image/svg+xml'});
    const element = document.createElement("a");
    element.download = "poster.svg";
    element.href = window.URL.createObjectURL(blob);
    element.click();
    window.URL.revokeObjectURL(element.href);
    element.remove();
  }


  return (
    <div className="poster">
      <div className="poster-container" id='poster-container'>
        <svg
          ref={posterRef}
          key="posterWindow"
          width="1000"
          height="1414"
          viewBox="0 0 1000 1414"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect key="renderWindow" width="1000" height="1414" fill="#1E1E1E"/>
          <DrapAndDropComponent>
            {blockChainNumberFromApp && <BlockChain blockChainNumberFromApp={blockChainNumberFromApp} setBlockPosition={setFromRect}/>}
          </DrapAndDropComponent>
          <Lines fromRect={fromRect} toRect={toRect} posterRect={posterRect}/>
          <DrapAndDropComponent>
            {blockInfo && blockChainNumberFromApp && <BlockData blockInfo={blockInfo} blockChainNumberFromApp={blockChainNumberFromApp} setBlockPosition={setToRect}/>}
          </DrapAndDropComponent>
          <NotesLayer blockInfo={blockInfo}/>
        </svg>
      </div>
      <br/>
      <button id='downloadSVG' className='downloadSVG' onClick={downloadSVG}>Download Poster</button>
    </div>
  );
};
export default Poster;
