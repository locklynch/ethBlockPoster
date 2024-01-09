// Poster.jsx

import React, { useState, useRef, useEffect } from 'react';
import BlockData from './BlockData';
import BlockHeader from './BlockHeader.jsx';
import { DrapAndDropComponent } from './DragAndDrop';
import BlockChain from './BlockChain';
import Lines from './LinesToBlock';
import HeaderLines from './LinesToHeader.jsx';
import NotesLayer from './NotesLayer';
import useResizeAndScrollEffect from './ResizeAndScrollHelper';
import NoteLine from './LinesToNotes';
import notesText from './staticText.js';
import html2canvas from 'html2canvas';
import "../../App.css";

const theNotes = notesText.ethereumjs_execution_block

const useNotesController  = (posterRect) => {
  const [noteState, setNoteState] = useState({})
  const [transactionStringRect, setTransactionStringRect] = useState(null);
  const [withdrawalStringRect, setWithdrawalStringRect] = useState(null);

  const set = (id, type, rect) => {
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
  const [fromBlockHeaderRect, setFromBlockHeaderRect] = useState ()
  const [toBlockHeaderRect, setToBlockHeaderRect] = useState ()
  const [posterRect, setPosterRect] = useState()
  const posterRef = useRef(null)
  const [blockScale, setBlockScale] = useState(0.27)
  const [svgPreview, setSvgPreview] = useState()
  const [isToggled, setToggled] = useState(true)
  const [captureLoading, setCaptureLoading] = useState(false);

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

  const downloadPNG = async () => {
    setCaptureLoading(true);
    try {
      const canvas = await html2canvas(posterRef.current);
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'poster.png';
      link.click();
    } catch (error) {
      console.error('Error capturing poster:', error);
    } finally {
      setCaptureLoading(false);
    }
  };

  useEffect(() => {
    if (posterRef.current) {
      html2canvas(posterRef.current).then(canvas => {
        // Your logic here if needed after capturing the canvas
      });
    }
  }, [posterRef.current]);


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
          <rect key="renderWindow" width="1000" height="1414" fill="#111111"/>
          <DrapAndDropComponent>
            {blockChainNumberFromApp && <BlockChain
              blockChainNumberFromApp={blockChainNumberFromApp}
              setBlockPosition={setFromRect}/>}
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
              setBlockHeaderPosition={setFromBlockHeaderRect}
              blockScale={blockScale}
              blockObject={blockObject}
              // setNoteFromRect={setFrom}
              isToggled={isToggled}
              setTransactionStringRect={setTransactionStringRect}
              setWithdrawalStringRect={setWithdrawalStringRect}
            />}
          </DrapAndDropComponent>
          <HeaderLines
            fromRect={fromBlockHeaderRect}
            toRect={toBlockHeaderRect}
            posterRect={posterRect}
          />
          <DrapAndDropComponent>
            {blockObject && <BlockHeader
              blockObject={blockObject}
              blockScale={blockScale}
              setNoteFromRect={setFrom}
              setBlockHeaderPosition={setToBlockHeaderRect}
            />}
          </DrapAndDropComponent>
          {renderPolygons()}
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
      <button id='downloadSVG' className='downloadSVG' onClick={downloadSVG}>Download SVG</button>
      <button id='downloadPNG' className='downloadPNG' onClick={downloadPNG}>
          {captureLoading ? 'Capturing...' : 'Download PNG'}
        </button>
    </div>
  );
};
export default Poster;
