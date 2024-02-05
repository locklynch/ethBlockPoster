import React from "react";
import FullCube from "./FullCube";
import LeftCube from "./LeftCube";

const CubesLayer = ({}) => {
  return (
    <g>
      <FullCube/>
      <LeftCube/>
    </g>
  )
}

export default CubesLayer