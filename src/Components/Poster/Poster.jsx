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
  const [blockScale, setBlockScale] = useState(0.22)
  const [svgPreview, setSvgPreview] = useState()

  useResizeAndScrollEffect(posterRef, setPosterRect)

  const sendBlockScale = () => {
    let blockScale = document.getElementById('setBlockScale').value;
    setBlockScale(blockScale)
  }

  const previewPoster = () => {
    const svg = document.getElementById('poster-container').innerHTML;
    const encodedSVG = btoa(svg);
    const imgSrc = `data:image/svg+xml;base64,${encodedSVG}`;
    setSvgPreview(imgSrc)
  }

  const downloadSVG = () => {
    const svg = document.getElementById('poster-container').innerHTML;
    const blob = new Blob([svg], { type: 'image/svg+xml'});
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
            {blockInfo && blockChainNumberFromApp && <BlockData
              blockInfo={blockInfo}
              blockChainNumberFromApp={blockChainNumberFromApp}
              setBlockPosition={setToRect}
              blockScale={blockScale}
            />}
          </DrapAndDropComponent>
          <NotesLayer blockInfo={blockInfo}/>
        </svg>
        <br/>
        {svgPreview && <img src={svgPreview}/>}
      </div>
      <br/>
      <label htmlFor='setBlockScale'>Set Block Scale: </label>
      <input type='number' id='setBlockScale' name='setBlockScale' placeholder='0.22'/>
      <button id='setBlockScale' className='setBlockScale' onClick={sendBlockScale}>SetBlockScale</button>
      <br/>
      <button id='previewPoster' className='previewPoster' onClick={previewPoster}>Preview Poster</button>
      <button id='downloadSVG' className='downloadSVG' onClick={downloadSVG}>Download Poster</button>
    </div>
  );
};
export default Poster;
