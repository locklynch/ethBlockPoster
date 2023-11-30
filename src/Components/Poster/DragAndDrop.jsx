//Parent module to make sure everything is draggable around the poster
//in case the user wants to format the poster differently than the starting layout

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';


export function useSvgDraggable(ref) {
  useEffect(() => {
    let translateX = 0;
    let translateY = 0;
    
    const handleDrag = d3.drag()
      .subject(() => {
        return { x: translateX, y: translateY };
      })
      .on('drag', function(event) {
        const me = d3.select(this);
        const transform = `translate(${event.x}, ${event.y})`;
        translateX = event.x;
        translateY = event.y;
        me.attr('transform', transform);
      });

    if (ref.current) {
      handleDrag(d3.select(ref.current));
    }
  }, [ref]);
}

export const DrapAndDropComponent = ({ children }) => {
  const ref = useRef(null);
  useSvgDraggable(ref);

  return (
    <g ref={ref}>
      {children}
    </g>
  );
};
