// BlockInfoContext.js
import { createContext, useContext, useState } from 'react';

const BlockInfoContext = createContext();

export const useBlockInfo = () => {
  return useContext(BlockInfoContext);
};

export const BlockInfoProvider = ({ children }) => {
  const [blockInfo, setBlockInfo] = useState('');

  const value = {
    blockInfo,
    setBlockInfo,
  };

  return (
    <BlockInfoContext.Provider value={value}>
      {children}
    </BlockInfoContext.Provider>
  );
};
