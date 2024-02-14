import React from 'react';
import FullCubeLayer from './FullCubeLayer';
import GhostText from './GhostText';

const ParentHash = ({blockObject}) => {

  return (
    <g>
      <GhostText
        indexString={'parentHash'}
        blockObject={blockObject}/>
      {blockObject && <FullCubeLayer
        data={blockObject.header.parentHash}
      />}
      <text
        x={700}
        y={735}
        fill='black'
        transform='rotate(-35) skewX(-30)'
      >
        .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  parentHash
      </text>
    </g>
  )
}

export default ParentHash