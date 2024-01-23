import React from 'react';
// import BlockUtils from "./BlockUtils";
import {Buffer} from 'buffer'


const ParentHash = ({blockObject}) => {
  console.log('blockObject:', blockObject)
  console.log('header:', blockObject.header)
  
  const valueToHex = (value) => value === undefined ? false : Buffer.from(value).toString('hex')
  const parentHash = blockObject.header ? valueToHex(blockObject.header.parentHash) : null;

  console.log('parentHash:', parentHash)
  

  return (
    <div>
      <span
        style={{
        color: 'white',
        overflowWrap: 'break-word',
        width: '100',
        height: '100',
        opacity: '50%'
        }}
      >
        {parentHash}
      </span>
    </div>
  )
}

export default ParentHash