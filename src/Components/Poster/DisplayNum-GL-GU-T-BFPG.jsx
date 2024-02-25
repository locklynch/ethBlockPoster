//Module for displaying the data for number, gasLimit, gasUsed, baseFeePerGas, and timestamp

import React from 'react';
import FullCubeLayer from './FullCubeLayer';
import GhostText from './GhostText';
import LabelMaker from './LabelMaker';

const MultiLayer = ({blockObject}) => {
    const numberText = 'number'
    const gasLimitText = 'gasLimit'
    const gasUsedText = 'gasUsed'
    const baseFeePerGasText = 'baseFeePerGas'
    const timestampText = 'timestamp'
    //CHECK THESE TO MAKE SURE I DON"T NEED TO ADD '.bytes' TO THEM!!!!!
    const number = blockObject.header.number
    const gasLimit = blockObject.header.gasLimit
    const gasUsed = blockObject.header.gasUsed
    const baseFeePerGas = blockObject.header.baseFeePerGas
    const timestamp = blockObject.header.timestamp

    const concatenatedValues = `${number}, ${gasLimit}, ${gasUsed}, ${baseFeePerGas}, ${timestamp}`;

    console.log('all of them:', concatenatedValues)

    //add all the Text constants into one variable then send to the labelMaker
    //somehow combine all the data above into one layer and send it to FullCubeLayer!
    //then also send the combined bytes to the ghostText as well

    return (
        <g transform='translate(0,640)'>
          <GhostText
            indexString={numberText}
            blockObject={blockObject}/>
          {blockObject && <FullCubeLayer
            data={number}
          />}
          <LabelMaker
            text={numberText}/>
        </g>
      )
    }
    
    export default MultiLayer