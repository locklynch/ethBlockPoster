// The line that's supposed to connect the top left corner of the small block in the chain to the expanded block window

import React from 'react';


const TopLeftLine = ({fromRect, toRect, posterRect}) => {
    if (!fromRect || !toRect || !posterRect) {
        return
    }
        return (
        <line
            x1={(fromRect.left-posterRect.left)}
            y1={(fromRect.top-posterRect.top)}
            x2={(toRect.left-posterRect.left)}
            y2={(toRect.top-posterRect.top)}
            stroke='white'
            strokeWidth={2}
        />
        );
   }

   export default TopLeftLine