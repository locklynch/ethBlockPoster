import React from "react";

const Cubes = ({ width, height, x, y, opacity }) => {

  return (
    <svg
      viewBox="0 0 256 417"
      width="32"
      height="42"
      x="100"
      y1="100"
      opacity="100%"
    >
      <g>
      <g clipPath="url(#clip0_16_27)">
        <rect width="32" height="42" fill="white"/>
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

export default Cubes

