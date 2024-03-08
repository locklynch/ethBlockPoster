import React from "react";

const LabelMaker = ({text}) => {
  return (
    <text
        x={700}
        y={735}
        fill='none' //CHANGE THIS BACK TO BLACK TO BE SEEN!
        transform='rotate(-35) skewX(-30)'
      >
        .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  .  {text}
      </text>
  )
}

export default LabelMaker