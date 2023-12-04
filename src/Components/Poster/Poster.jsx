// Poster.jsx
import React, { useState, useRef, useEffect } from 'react';
import BlockData from './BlockData';
import { DrapAndDropComponent } from './DragAndDrop';
import { infoNotes } from '../../assets/staticText.json';
import BlockChain from './BlockChain';
import TopLeftLine from './TopLeftLine';

const Poster = ({ blockInfo, blockChainNumberFromApp }) => {
  // const [blockPosition, setBlockPosition] = useState ();
  const [fromRect, setFromRect] = useState ()
  const [toRect, setToRect] = useState ()
  const [posterRect, setPosterRect] = useState()

  const posterRef = useRef(null)

  useEffect (() => {
      const handleResize = () => {
        if (posterRef.current) {
          setPosterRect(posterRef.current.getBoundingClientRect())
        };
      };
      handleResize()

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="poster">
      <div className="poster-container">
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
        <TopLeftLine fromRect={fromRect} toRect={toRect} posterRect={posterRect}/>
        <DrapAndDropComponent>
          {blockInfo && blockChainNumberFromApp && <BlockData blockInfo={blockInfo} blockChainNumberFromApp={blockChainNumberFromApp} setBlockPosition={setToRect}/>}
        </DrapAndDropComponent>
        {blockInfo && infoNotes.map((note, index,) => (
          <DrapAndDropComponent key={note.id} style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'white'}}>
            <text
              x="350"
              y={100 + (40 * index)}
              fill="white"
              fontSize="16"
            >{note.text}</text>
          </DrapAndDropComponent>
        ))}
      </svg>
      </div>
    </div>
  );
};
export default Poster;
