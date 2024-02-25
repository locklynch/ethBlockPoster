import React from 'react';
import FullCubeLayer from './FullCubeLayer';
import GhostText from './GhostText';
import LabelMaker from './LabelMaker';

const ReceiptTrie = ({blockObject}) => {
  const receiptTrie = 'receiptTrie'

  return (
    <g transform='translate(0,180)'>
      <GhostText
        indexString={receiptTrie}
        blockObject={blockObject}/>
      {blockObject && <FullCubeLayer
        data={blockObject.header.receiptTrie}
      />}
      <LabelMaker
        text={receiptTrie}/>
    </g>
  )
}

export default ReceiptTrie