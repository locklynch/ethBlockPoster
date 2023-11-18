// Poster.jsx
import React from 'react';
// import BlockData from './BlockData';

const Poster = () => {
  return (
    <div className="poster">
      <div className="poster-container">
        <svg viewBox="0 0 1000 1414" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          {/* Your SVG content goes here */}
          <rect x="0" y="0" width="1000" height="1414" fill="#ffffff" stroke="#000000" strokeWidth="2" />
          {/* Display block data within the poster */}
          {/* <foreignObject x="100" y="100" width="800" height="1200"> */}
            {/* <BlockData blockInfo={blockInfo} /> */}
          {/* </foreignObject> */}
        </svg>
      </div>
    </div>
  );
};

export default Poster;
