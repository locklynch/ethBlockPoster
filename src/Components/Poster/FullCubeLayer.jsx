import React from "react";

const FullCube = () => {
  return (
    <svg
      viewBox="0 0 256 417"
      width="320"
      height="420"
      x="452.5"
      y="500"
      opacity="100%"
    >
      <g>
      <g clipPath="url(#clip0_16_27)">
        <rect width="32" height="42" fill="none"/>
        <g clipPath="url(#clip1_16_27)">
        <path d="M31.6537 10.7819L15.8334 21.2454L0 10.7819L15.8334 0.10788L31.6537 10.7819Z" fill="#0D0E11"/>
        <path d="M31.68 30.4191L31.6536 14.5725L15.8334 25.036L15.8597 41.0932L31.68 30.4191Z" fill="#0D0E11"/>
        <path d="M0 30.498L0.0263232 14.6515L15.3333 24.7727L15.8597 25.1149L15.8203 41.1721L0 30.498Z" fill="#0D0E11"/>
        </g>
        </g>
        <defs>
        <clipPath id="clip0_16_27">
        <rect width="32" height="42" fill="white"/>
        </clipPath>
        <clipPath id="clip1_16_27">
        <rect width="31.68" height="41.28" fill="white"/>
        </clipPath>
        </defs>
      </g>
    </svg>
  )
}

const leftRow = (x, y) => {
  return (
    <svg
      width="32"
      height="42"
      viewBox="0 0 32 42"
      x={465 + x}
      y={487.5 + y}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_16_31)">
        <rect width="32" height="42" fill="none"/>
        <g clipPath="url(#clip1_16_31)">
          <path d="M0.0263672 10.7819L15.8598 21.2454L31.68 10.7819L15.8598 0.10788L0.0263672 10.7819Z" fill="#0D0E11"/>
          <path d="M0 30.4191L0.0263232 14.5725L15.8597 25.036L15.8203 41.0932L0 30.4191Z" fill="#0D0E11"/>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_16_31">
          <rect width="32" height="42" fill="white"/>
        </clipPath>
        <clipPath id="clip1_16_31">
          <rect width="31.68" height="41.28" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

const rightRow = (x, y) => {
  return (
    <svg width="32"
      height="42"
      viewBox="0 0 32 42"
      x={503 + x}
      y={488 + y}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_16_35)">
        <rect width="32" height="42" fill="none"/>
        <g clipPath="url(#clip1_16_35)">
          <path d="M31.6537 10.7819L15.8334 21.2454L0 10.7819L15.8334 0.10788L31.6537 10.7819Z" fill="#0D0E11"/>
          <path d="M31.68 30.4191L31.6536 14.5725L15.8334 25.036L15.8597 41.0932L31.68 30.4191Z" fill="#0D0E11"/>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_16_35">
          <rect width="32" height="42" fill="white"/>
        </clipPath>
        <clipPath id="clip1_16_35">
          <rect width="31.68" height="41.28" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

const topsOnly = (x, y, x1, y1) => {
  return (
    <svg
      width="32"
      height="42"
      viewBox="0 0 32 42"
      x={484 + x + x1}
      y={475 + y + y1}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_16_39)">
        <rect width="32" height="42" fill="none"/>
        <g clipPath="url(#clip1_16_39)">
          <path d="M31.6537 10.7819L15.8334 21.2454L0 10.7819L15.8334 0.10788L31.6537 10.7819Z" fill="#0D0E11"/>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_16_39">
          <rect width="32" height="42" fill="white"/>
        </clipPath>
        <clipPath id="clip1_16_39">
          <rect width="31.68" height="41.28" fill="white"/>
        </clipPath>
      </defs>
    </svg>

  )
}

const FullCubeLayer = ({ }) => {

  return (
    <g>
      {/* Bottom Center Cube */}
      {FullCube()}
      {/* left row of cubes */}
      {leftRow(-19 * 0, -12.5 * 0)}
      {leftRow(-19 * 1, -12.5 * 1)}
      {leftRow(-19 * 2, -12.5 * 2)}
      {leftRow(-19 * 3, -12.5 * 3)}
      {leftRow(-19 * 4, -12.5 * 4)}
      {/* right row of cubes */}
      {rightRow(19 * 0, -12.5 * 0)}
      {rightRow(19 * 1, -12.5 * 1)}
      {rightRow(19 * 2, -12.5 * 2)}
      {rightRow(19 * 3, -12.5 * 3)}
      {rightRow(19 * 4, -12.5 * 4)}
      {/* the tops of cubes */}
      {/* second left row */}
      {topsOnly(-19 * 0, -12.5 * 0, 0, 0)}
      {topsOnly(-19 * 1, -12.5 * 1, 0, 0)}
      {topsOnly(-19 * 2, -12.5 * 2, 0, 0)}
      {topsOnly(-19 * 3, -12.5 * 3, 0, 0)}
      {topsOnly(-19 * 4, -12.5 * 4, 0, 0)}
      {/* third left row */}
      {topsOnly(-19 * 0, -12.5 * 0, 19, -12.5)}
      {topsOnly(-19 * 1, -12.5 * 1, 19, -12.5)}
      {topsOnly(-19 * 2, -12.5 * 2, 19, -12.5)}
      {topsOnly(-19 * 3, -12.5 * 3, 19, -12.5)}
      {topsOnly(-19 * 4, -12.5 * 4, 19, -12.5)}
      {/* forth left row */}
      {topsOnly(-19 * 0, -12.5 * 0, 19 * 2, -12.5 * 2)}
      {topsOnly(-19 * 1, -12.5 * 1, 19 * 2, -12.5 * 2)}
      {topsOnly(-19 * 2, -12.5 * 2, 19 * 2, -12.5 * 2)}
      {topsOnly(-19 * 3, -12.5 * 3, 19 * 2, -12.5 * 2)}
      {topsOnly(-19 * 4, -12.5 * 4, 19 * 2, -12.5 * 2)}
      {/* fifth left row */}
      {topsOnly(-19 * 0, -12.5 * 0, 19 * 3, -12.5 * 3)}
      {topsOnly(-19 * 1, -12.5 * 1, 19 * 3, -12.5 * 3)}
      {topsOnly(-19 * 2, -12.5 * 2, 19 * 3, -12.5 * 3)}
      {topsOnly(-19 * 3, -12.5 * 3, 19 * 3, -12.5 * 3)}
      {topsOnly(-19 * 4, -12.5 * 4, 19 * 3, -12.5 * 3)}
      {/* sixth left row */}
      {topsOnly(-19 * 0, -12.5 * 0, 19 * 4, -12.5 * 4)}
      {topsOnly(-19 * 1, -12.5 * 1, 19 * 4, -12.5 * 4)}
      {topsOnly(-19 * 2, -12.5 * 2, 19 * 4, -12.5 * 4)}
      {topsOnly(-19 * 3, -12.5 * 3, 19 * 4, -12.5 * 4)}
      {topsOnly(-19 * 4, -12.5 * 4, 19 * 4, -12.5 * 4)}
    </g>
  )
}

export default FullCubeLayer

