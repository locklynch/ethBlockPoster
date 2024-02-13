import React from "react";
import CubeLayerBytesPlane from "./CubeLayerBytesPlane";
import CubeLayerBitPlane from "./CubeLayerBitPlane";
// import colorPalette from "./ColorPalette";

const FullCubeLayer = ({data}) => {

  // getColorForData(data)

  return (
    CubeLayerBytesPlane({data})
  )
}

export default FullCubeLayer