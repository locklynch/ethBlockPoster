// Poster.jsx

import React, { useState, useRef, useEffect } from 'react';
import EthLogo from './EthLogo.jsx';
import html2canvas from 'html2canvas';
import "../../App.css";
import {ThemeContext} from './GlobalColorPalette.jsx'
import ParentHash from './DisplayParentHash.jsx'
import Coinbase from './DisplayCoinBase.jsx';
import StateRoot from './DisplayStateRoot.jsx';
import TransactionsTrie from './DisplayTransactionTrie.jsx';
import ReceiptTrie from './DisplayReceiptTrie.jsx';
import LogsBloom from './DisplayLogsBloom.jsx';

const Poster = ({ blockObject }) => {
  const posterRef = useRef(null)
  const [selectedPalette, setSelectedPalette] = useState('startingPoint')
  const [svgPreview, setSvgPreview] = useState()
  // PNG Download shenanigans
  // const [captureLoading, setCaptureLoading] = useState(false);

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
  // const downloadPNG = async () => {
  //   setCaptureLoading(true);
  //   try {
  //     const canvas = await html2canvas(posterRef.current);
  //     const imgData = canvas.toDataURL('image/png');
  //     const link = document.createElement('a');
  //     link.href = imgData;
  //     link.download = 'poster.png';
  //     link.click();
  //   } catch (error) {
  //     console.error('Error capturing poster:', error);
  //   } finally {
  //     setCaptureLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (posterRef.current) {
  //     html2canvas(posterRef.current).then(canvas => {
  //       // Probably need to fill this out to fix stuff! will get to later
  //     });
  //   }
  // }, [posterRef.current]);

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
            <rect key="renderWindow" width="1000" height="1414" fill="#FFFFFF"/>
            <svg
              overflow={'hidden'}
              width='2500'
              height='2500'
              x='-750'
              y='-500'
              opacity='50%'>
                <EthLogo/>
            </svg>
            <g transform='translate(0,-100)'>
              {blockObject && <LogsBloom
                blockObject={blockObject}
              />}
              {blockObject && <ReceiptTrie
                blockObject={blockObject}
              />}
              {blockObject && <TransactionsTrie
                blockObject={blockObject}
              />}
              {blockObject && <StateRoot
                blockObject={blockObject}
              />}
              {blockObject && <Coinbase
                blockObject={blockObject}
              />}
              {blockObject && <ParentHash
                blockObject={blockObject}
              />}
            </g>
          </svg>
          <br/>
          {/* {svgPreview && <img src={svgPreview}/>} */}
        </div>
        <button id='previewPoster' className='previewPoster' onClick={previewPoster}>Preview Poster</button>
        <button id='downloadSVG' className='downloadSVG' onClick={downloadSVG}>Download SVG</button>
        {/* <button id='downloadPNG' className='downloadPNG' onClick={downloadPNG}>
            {captureLoading ? 'Capturing...' : 'Download PNG'}
        </button> */}
      </div>
    </ThemeContext.Provider>
  );
};

export default Poster;
