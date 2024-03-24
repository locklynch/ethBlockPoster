import React from "react";
// import CubeLayerBytesPlane from "./CubeLayerBytesPlane";
import CubeLayerBytesPlane from "./CubeLayerBitPlane";
import colorPalette from "./ColorPalette";

const FullCubeLayer = ({data, saturationModifier}) => {

  // getColorForData(data)

  return (
    CubeLayerBytesPlane({data, saturationModifier})
  )
}

export default FullCubeLayer