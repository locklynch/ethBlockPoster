import React from 'react';
import FullCubeLayer from './FullCubeLayer';
import GhostText from './GhostText';
import LabelMaker from './LabelMaker';

const PrevRandao = ({blockObject}) => {
  const prevRandao = 'prevRandao'

  return (
    <g transform='translate(0,870)'>
      <GhostText
        indexString={prevRandao}
        blockObject={blockObject}/>
      {blockObject && <FullCubeLayer
        data={blockObject.header.prevRandao}
      />}
      <LabelMaker
        text={prevRandao}/>
    </g>
  )
}

export default PrevRandao