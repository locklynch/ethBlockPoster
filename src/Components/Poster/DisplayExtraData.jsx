import React from 'react';
import FullCubeLayer from './FullCubeLayer';
import GhostText from './GhostText';
import LabelMaker from './LabelMaker';

const ExtraData = ({blockObject}) => {
  const extraData = 'extraData'

  return (
    <g transform='translate(0,585)'>
      <GhostText
        indexString={extraData}
        blockObject={blockObject}/>
      {blockObject && <FullCubeLayer
        data={blockObject.header.extraData}
      />}
      <LabelMaker
        text={extraData}/>
    </g>
  )
}

export default ExtraData