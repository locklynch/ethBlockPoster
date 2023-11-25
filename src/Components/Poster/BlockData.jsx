// BlockData.jsx

import React, { useState, useEffect, useRef } from 'react';

const colorPalette = [
  '#FFD1DC', // Light Pink
  '#FFD700', // Light Gold
  '#98FB98', // Mint Green
  '#ADD8E6', // Light Blue

];


const Rlp = ({ rlpObject, colorIndex = 0, parentKey='' }) => {
  if (!Array.isArray(rlpObject)) {
    const hexString = Buffer.from(rlpObject).toString('hex')
    const color = colorPalette[colorIndex % colorPalette.length]
    return (
      <span style={{ color, overflowWrap: 'break-word' }}>{hexString}</span>
    )
  }
  return rlpObject.map((item, index) => {
    const key = `${parentKey}-${index}`
    return (
      <Rlp rlpObject={item} colorIndex={colorIndex + index} key={key} parentKey={key}></Rlp>
    )
  })
}

const BlockData = ({ blockInfo, onMove }) => {
  const { decodedBlock } = blockInfo
  // block poster starting location
  const posterStartX = 250
  const posterStartY = 20
  // const scale = .253
  const scale = 0.25

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [contentHeight, setContentHeight] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      onMove({ x: deltaX, y: deltaY });

      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      setContentHeight(bbox.height)
      console.log(bbox)
    }
  }, [decodedBlock]);


  return (
    <>
      <rect
        width="100%"
        height="100%"
        fill="#1E1E1E"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      />
        <foreignObject
          x={posterStartX + (posterStartX / scale)}
          y={posterStartY + (posterStartY / scale)}
          width={(600) / scale}
          height={(1000) / scale}
          transform={`scale(${scale})`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
            border: '10px solid white',
          }}
        >
          <div xmlns="http://www.w3.org/1999/xhtml" className="block-data">
            <Rlp rlpObject={decodedBlock} />
          </div>
        </foreignObject>
        <text x={posterStartX+80} y={posterStartY+40} fill="white" fontSize="20">
          Block Information
        </text>
    </>
  );
};

export default BlockData;
