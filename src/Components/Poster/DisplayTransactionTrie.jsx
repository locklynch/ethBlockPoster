import React from 'react';
import FullCubeLayer from './FullCubeLayer';
import GhostText from './GhostText';
import LabelMaker from './LabelMaker';

const TransactionsTrie = ({blockObject}) => {
  const transactionsTrie = 'transactionsTrie'

  return (
    <g transform='translate(0,220)'>
      <GhostText
        indexString={transactionsTrie}
        blockObject={blockObject}/>
      {blockObject && <FullCubeLayer
        data={blockObject.header.transactionsTrie}
      />}
      <LabelMaker
        text={transactionsTrie}/>
    </g>
  )
}

export default TransactionsTrie