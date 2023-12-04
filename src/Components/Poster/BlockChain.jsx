// block chain representation for display on the poster

import React, { useState, useEffect, useRef } from 'react';
import Ethereum_Logo_2014 from '../../assets/Ethereum_logo_2014.svg'

const BlockChain = ( { blockChainNumberFromApp, setBlockPosition }) => {
    const number = blockChainNumberFromApp
    const targetBlockRef = useRef(null)

    useEffect(() => {
        const handleResize = () => {
            const targetBlock = targetBlockRef.current;
            if (targetBlock) {
                setBlockPosition(
                    targetBlock.getBoundingClientRect()
                )
            };
        };
        handleResize();
        // Add event listener
        window.addEventListener('resize', handleResize);

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, [])

        const prevBlockNumber = number-1;
        const mainBlockNumber = number;
        const nextBlockNumbers = Array.from({length: 7}, (_, index) => mainBlockNumber + index);

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
                ></rect>
                <image  key={'smallethlogo'+index} width='100' height='100' x='40' y={40+index*170} href={Ethereum_Logo_2014} opacity='10%'/>
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