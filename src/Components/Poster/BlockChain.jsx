// block chain representation for display on the poster

import React, { useState, useEffect, useRef } from 'react';

const BlockChain = ( { blockChainNumber }) => {
    let number = blockChainNumber
    // console.log(number)
    // const isValidNumber =!isNaN(parseInt(blockChainNumber, 10))

    // if (!isValidNumber) {
    //     return console.log(blockChainNumber)
    // }
        const prevBlockNumber = number-1;
        const mainBlockNumber = number;
        const nextBlockNumbers = Array.from({length: 7}, (_, index) => mainBlockNumber + index);

    return (
        <>
            {[prevBlockNumber, ...nextBlockNumbers].map((num, index) => (
                <>
                <rect
                    key={index}
                    x="40"
                    y={20+index*170}
                    width="100"
                    height="148"
                    fill="black"
                    stroke="white"
                    strokeWidth="2"
                ></rect>
                    <text x="90" y={80+index*170} fill="white" textAnchor="middle" dy=".3em" style={{ fill: "white", fontSize: "17"}}>
                        {num}
                    </text>
                </>
            ))}
        </>
    )
}

export default BlockChain