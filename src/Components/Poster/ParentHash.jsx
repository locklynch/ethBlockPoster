import React from 'react';
import FullCubeLayer from './FullCubeLayer';
import GhostText from './GhostText';
import LabelMaker from './LabelMaker';

const ParentHash = ({blockObject}) => {
  const parentHash = 'parentHash'

  return (
    <g transform='translate(0,-100)'>
      <GhostText
        indexString={parentHash}
        blockObject={blockObject}/>
      {blockObject && <FullCubeLayer
        data={blockObject.header.parentHash}
      />}
      <LabelMaker
        text={parentHash}/>
    </g>
  )
}

export default ParentHash