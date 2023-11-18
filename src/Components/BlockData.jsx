// BlockData.jsx

import React from 'react';
import { BlockInfoContext } from './BlockInfoContext';

const BlockData = ({ blockInfo }) => {
  return (
    <div className="block-data">
      <h2>Block Information</h2>
      <pre>{blockInfo}</pre>
    </div>
  );
};

export default BlockData;
