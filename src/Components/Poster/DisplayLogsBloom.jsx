import React from 'react';
import FullCubeLayer from './FullCubeLayer';
import GhostText from './GhostText';
import LabelMaker from './LabelMaker';

const LogsBloom = ({blockObject}) => {

  const byteIntArray = new Uint8Array(blockObject.header.logsBloom.buffer, blockObject.header.logsBloom.byteOffset, 252);
  const cubeLayersArray = []

  for (let i=0; i < byteIntArray.length; i += 36) {
    cubeLayersArray.push(byteIntArray.slice(i, i + 36))
  }

  // console.log('each seperate layer:', cubeLayersArray)

  const logsBloom = 'logsBloom'

  return (
    <g transform='translate(0,500)'>
      <GhostText
        indexString={logsBloom}
        blockObject={blockObject}/>
      <g transform='translate(0, 120)'>
        {blockObject && <FullCubeLayer
        data={cubeLayersArray[6]}
        />}
      </g>
      <g transform='translate(0, 100)'>
        {blockObject && <FullCubeLayer
        data={cubeLayersArray[5]}
        />}
      </g>
      <g transform='translate(0, 80)'>
        {blockObject && <FullCubeLayer
        data={cubeLayersArray[4]}
        />}
      </g>
      <g transform='translate(0, 60)'>
        {blockObject && <FullCubeLayer
        data={cubeLayersArray[3]}
        />}
      </g>
      <g transform='translate(0, 40)'>
        {blockObject && <FullCubeLayer
        data={cubeLayersArray[2]}
        />}
      </g>
      <g transform='translate(0, 20)'>
        {blockObject && <FullCubeLayer
        data={cubeLayersArray[1]}
        />}
      </g>
      <g transform='translate(0, 0)'>
        {blockObject && <FullCubeLayer
        data={cubeLayersArray[0]}
        />}
      </g>
      <g transform='translate(0, 120)'>
        <LabelMaker
          text={logsBloom}/>
      </g>
    </g>
  )
}

export default LogsBloom