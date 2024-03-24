import React from 'react';
import FullCubeLayer from './FullCubeLayer';
import GhostText from './GhostText';
import LabelMaker from './LabelMaker';

const Coinbase = ({blockObject}) => {
  const coinbase = 'coinbase'

  const saturationModifier=0.5

  return (
    <g
      transform='translate(0,-105)'
      id='coinbaseDisplay'
    >
      <GhostText
        indexString={coinbase}
        blockObject={blockObject}/>
      {blockObject && <FullCubeLayer
        data={blockObject.header.coinbase.bytes}
        saturationModifier={saturationModifier}
      />}
      <LabelMaker
        text={coinbase}/>
    </g>
  )
}

export default Coinbase