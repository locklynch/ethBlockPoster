// Poster.jsx

import React, { useState, useRef, useEffect } from 'react';
import BlockData from './BlockData.jsx';
import BlockHeader from './BlockHeader.jsx';
import { DrapAndDropComponent } from './DragAndDrop.jsx';
import BlockChain from './BlockChain.jsx';
import Lines from './LinesToBlock.jsx';
import HeaderLines from './LinesToHeader.jsx';
import TransactionLines from './LinesToTransaction.jsx';
import WithdrawalLines from './LineToWithdrawal.jsx';
import NotesLayer from '../NotesLayer.jsx';
import useResizeAndScrollEffect from './ResizeAndScrollHelper.jsx';
import NoteLine from './LinesToNotes.jsx';
import notesText from '../staticText.js';
import html2canvas from 'html2canvas';
import "../../App.css";
import GlobalColorPalette from '../GlobalColorPalette.jsx';
import Transaction from './Transaction.jsx';
import Withdrawal from './Withdrawals.jsx';
import {ThemeContext} from '../GlobalColorPalette.jsx'
import ParentHash from '../ParentHash.jsx'

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
  const [fromTransactionRect, setFromTransactionRect] = useState ()
  const [toTransactionRect, setToTransactionRect] = useState ()
  const [fromWithdrawalRect, setFromWithdrawalRect] = useState ()
  const [toWithdrawalRect, setToWithdrawalRect] = useState ()
  const [posterRect, setPosterRect] = useState()
  const posterRef = useRef(null)
  const [blockScale, setBlockScale] = useState(0.265)
  const [svgPreview, setSvgPreview] = useState()
  const [isToggled, setToggled] = useState(true)
  const [captureLoading, setCaptureLoading] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState('startingPoint')

  const {
    setTo,
    setFrom,
    noteState,
    setTransactionStringRect,
    setWithdrawalStringRect,
    render: renderPolygons,
  } = useNotesController(posterRect)

  useResizeAndScrollEffect(posterRef, setPosterRect)

  // code for sending the color selection to the GlobalColorPalette module
  const handleColorChange = (event) => {
    const selectedPalette = event.target.value;
    setSelectedPalette(selectedPalette)
  }

  // code for running the set block scale control
  const sendBlockScale = () => {
    let blockScale = document.getElementById('setBlockScale').value;
    setBlockScale(blockScale)
  }

  // code for handling inclusion of transactions and withdrawals
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

  // preview poster code (was using to compair poster display and what the download looks like, probably don't need this anymore though)
  const previewPoster = () => {
    const svg = posterRef.current.outerHTML;
    const encodedSVG = btoa(svg);
    const imgSrc = `data:image/svg+xml;base64,${encodedSVG}`;
    setSvgPreview(imgSrc)
  }

  // code for downloading SVG STILL ONLY DISPLAYS CORRECTLY IN CHROME!
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

  // code for downloading PNG STILL NEED TO FIX THIS!
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
        // Probably need to fill this out to fix stuff! will get to later
      });
    }
  }, [posterRef.current]);


  const handleSetBlockScale = (event) => {
    if (event.key === 'Enter') {
      sendBlockScale();
    }
  }

  return (
    <ThemeContext.Provider value={selectedPalette}>
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
                setFromTransactionRect={setFromTransactionRect}
                setFromWithdrawalRect={setFromWithdrawalRect}
                blockScale={blockScale}
                blockObject={blockObject}
                isToggled={isToggled}
                setTransactionStringRect={setTransactionStringRect}
                setWithdrawalStringRect={setWithdrawalStringRect}
              />}
            </DrapAndDropComponent>
            <TransactionLines
              fromRect={fromTransactionRect}
              toRect={toTransactionRect}
              posterRect={posterRect}
            />
            <DrapAndDropComponent>
              {blockObject && <Transaction
                blockObject={blockObject}
                blockScale={blockScale}
                setToTransactionRect={setToTransactionRect}
                isToggled={isToggled}
              />}
            </DrapAndDropComponent>
            <WithdrawalLines
              fromRect={fromWithdrawalRect}
              toRect={toWithdrawalRect}
              posterRect={posterRect}
            />
            <DrapAndDropComponent>
              {blockObject && <Withdrawal
                blockObject={blockObject}
                blockScale={blockScale}
                setToWithdrawalRect={setToWithdrawalRect}
                isToggled={isToggled}
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
            {blockObject && <ParentHash
              blockObject={blockObject}
            />}
          </svg>
          <br/>
          {/* {svgPreview && <img src={svgPreview}/>} */}
        </div>
        <label htmlFor="colorSelector">Select a color:</label>
        <select id="colorSelector" onChange={handleColorChange}>
          <option value= "startingPoint">Might as Well Start Here</option>
          <option value="white">White</option>
          <option value="greys">Two Tone Grey</option>
          <option value="neon">Neon 90's Laser Tag</option>
          <option value="pastels">Pastel Clown Bois!</option>
          <option value="purples">Purple Plurality</option>
          <option value="blues">Bluey</option>
          <option value="greens">Ganga Greens</option>
          <option value="yellows">Yellow, because i have to</option>
          <option value="oranges">Orange Trees</option>
          <option value="reds">Reds, i'm tired of naming things now</option>
          <option value="pinks">Pinky and the Brain</option>
        </select>
        <br/>
        <label htmlFor='setBlockScale'>Set Block Scale: </label>
        <input type='number' id='setBlockScale' name='setBlockScale' placeholder='0.265' onKeyDown={handleSetBlockScale}/>
        <button id='setBlockScaleButton' className='setBlockScaleButton' onClick={sendBlockScale}>Rescale Block</button>
        <br/>
        <label className='transAndWithdrawalSwitchLabel' htmlFor='includeTransactions'>Include Transactions and Widthrawals: </label>
          {transSwitch()}
        <br/>
        <button id='previewPoster' className='previewPoster' onClick={previewPoster}>Preview Poster</button>
        <button id='downloadSVG' className='downloadSVG' onClick={downloadSVG}>Download SVG</button>
        <button id='downloadPNG' className='downloadPNG' onClick={downloadPNG}>
            {captureLoading ? 'Capturing...' : 'Download PNG'}
        </button>
        {/* <div className='colorPaletteContainer'>
          <GlobalColorPalette selectedPalette={selectedPalette} />
        </div> */}
      </div>
    </ThemeContext.Provider>
  );
};

export default Poster;