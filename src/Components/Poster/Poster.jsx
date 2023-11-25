// Poster.jsx
import React, {useState, useEffect} from 'react';
import BlockData from './BlockData';

const Poster = ({ blockInfo }) => {

  const [blockPosition, setBlockPosition] = useState({ x: 0, y: 0 });

  const handleBlockMove = (delta) => {
    setBlockPosition({
      x: blockPosition.x + delta.x,
      y: blockPosition.y + delta.y,
    });
  };

  return (
    <div className="poster">
      <div className="poster-container">
      <svg width="1000" height="1414" viewBox="0 0 1000 1414" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="1000" height="1414" fill="#1E1E1E"/>
        {/* the new dynamic poster */}
        {blockInfo && <BlockData blockInfo={blockInfo} onMove={handleBlockMove}/>}
      </svg>
      </div>
    </div>
  );
};
export default Poster;