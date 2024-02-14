import React from 'react';
import FullCubeLayer from './FullCubeLayer';
import GhostText from './GhostText';
import LabelMaker from './LabelMaker';

const Coinbase = ({blockObject}) => {
  const coinbase = 'coinbase'

  return (
    <g transform='translate(0,0)'>
      <GhostText
        indexString={coinbase}
        blockObject={blockObject}/>
      {blockObject && <FullCubeLayer
        data={blockObject.header.coinbase.bytes}
      />}
      <LabelMaker
        text={coinbase}/>
    </g>
  )
}

export default Coinbase