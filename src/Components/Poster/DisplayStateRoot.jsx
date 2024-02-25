import React from 'react';
import FullCubeLayer from './FullCubeLayer';
import GhostText from './GhostText';
import LabelMaker from './LabelMaker';

const StateRoot = ({blockObject}) => {
  const stateRoot = 'stateRoot'

  return (
    <g transform='translate(0,-10)'>
      <GhostText
        indexString={stateRoot}
        blockObject={blockObject}/>
      {blockObject && <FullCubeLayer
        data={blockObject.header.stateRoot}
      />}
      <LabelMaker
        text={stateRoot}/>
    </g>
  )
}

export default StateRoot