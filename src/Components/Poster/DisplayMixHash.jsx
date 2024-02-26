import React from 'react';
import FullCubeLayer from './FullCubeLayer';
import GhostText from './GhostText';
import LabelMaker from './LabelMaker';

const MixHash = ({blockObject}) => {
  const mixHash = 'mixHash'

  return (
    <g transform='translate(0,680)'>
      <GhostText
        indexString={mixHash}
        blockObject={blockObject}/>
      {blockObject && <FullCubeLayer
        data={blockObject.header.mixHash}
      />}
      <LabelMaker
        text={mixHash}/>
    </g>
  )
}

export default MixHash