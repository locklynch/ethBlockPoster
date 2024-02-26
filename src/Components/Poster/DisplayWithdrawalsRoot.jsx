import React from 'react';
import FullCubeLayer from './FullCubeLayer';
import GhostText from './GhostText';
import LabelMaker from './LabelMaker';

const WithdrawalsRoot = ({blockObject}) => {
  const withdrawalsRoot = 'withdrawalsRoot'

  return (
    <g transform='translate(0,775)'>
      <GhostText
        indexString={withdrawalsRoot}
        blockObject={blockObject}/>
      {blockObject && <FullCubeLayer
        data={blockObject.header.withdrawalsRoot}
      />}
      <LabelMaker
        text={withdrawalsRoot}/>
    </g>
  )
}

export default WithdrawalsRoot