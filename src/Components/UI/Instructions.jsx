import React from "react";

const Instructions = () => {
  return (
    <>
      <div id='instructions' className='instructions'>
        <h1>Some Quick Tips For Ya!</h1>
        <ol>
          <li>Enter an Infura API key, and an Ethereum block number and click fetch block to check it out!</li>
          <li>Feel free to click and drag all the elements of the poster around as well if you wanna tweak the layout</li>
          <li>Just for fun, the block is displayed below the Inputs as an object for copy and pasting or whatever ya like do</li>
          <li>The scale is there to adjust the length of the block in case it's too short or long to look cool</li>
          <li>I've been playing around with block 18181818, but anything after The Merge will do (15537394 and after) for now</li>
          <li>The most recent block looks cool (18704932 as of me typing this)</li>
        </ol>
      </div>
    </>
  )
}

export default Instructions