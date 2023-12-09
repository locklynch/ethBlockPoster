// block chain representation for display on the poster

import React, { useRef } from 'react';
import Ethereum_Logo_2014 from '../../assets/Ethereum_logo_2014.svg'
import useResizeAndScrollEffect from './ResizeAndScrollHelper';
import EthLogo from './EthLogo';

const BlockChain = ( { blockChainNumberFromApp, setBlockPosition }) => {
  const number = blockChainNumberFromApp
  const targetBlockRef = useRef(null)
  const prevBlockNumber = number-1;
  const mainBlockNumber = number;
  const nextBlockNumbers = Array.from({length: 7}, (_, index) => mainBlockNumber + index);

  useResizeAndScrollEffect(targetBlockRef, setBlockPosition)

  return (
    <g>
      {[prevBlockNumber, ...nextBlockNumbers].map((num, index) => (
        <g>
          <rect
            ref={index === 1 ? targetBlockRef: null}
            key={index}
            id={index}
            x="40"
            y={20+index*170}
            width="100"
            height="148"
            fill="black"
            stroke="white"
            strokeWidth="2"
          />
          <svg
            key={'smallethlogo'+index}
            x='-410'
            y={40+index*170}
            opacity={'50%'}
            height={100}
          >
            <EthLogo/>
          </svg>
          <text key={'blocktext'+index} x="90" y={70+index*170} fill="white" textAnchor="middle" dy=".3em" style={{ fill: "white", fontSize: "17"}}>
            block
          </text>
          <text key={'numtext'+index} x="90" y={90+index*170} fill="white" textAnchor="middle" dy=".3em" style={{ fill: "white", fontSize: "17"}}>
            {num}
          </text>
              
        </g>
      ))}
    </g>
  )
}

export default BlockChain