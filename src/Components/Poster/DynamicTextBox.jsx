// DynamicTextBox Component
import React, { useState } from 'react';

const DynamicTextBox = ({ id, x, y, text, onMove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      const newPosition = { x: x + deltaX, y: y + deltaY };
      onMove(id, newPosition);

      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const maxLineWidth = 30;
  const fontSize = 16;
  const words = text.split(' ');

  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const testLine = '${currentLine} ${words[i]}';
    const testWidth = testLine.length * (fontSize * 0.6);

    if (testWidth > maxLineWidth) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }

  lines.push(currentLine);

  const rectWidth = maxLineWidth + 10;
  const rectHeight = lines.length * (fontSize + 2); // Adjust multiplier based on font size

  return (
    <>
      <rect
        x={x -5}
        y={y}
        width={rectWidth + 10}
        height="20"
        fill="black"
        stroke="white"
        strokeWidth="1"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      />
      {lines.map((line, index) => (
        <text
          key={index}
          x={x}
          y={y + (index + 1) * (fontSize + 2)} // Adjust the y position based on font size
          fontSize={fontSize}
          fill="white"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
            whiteSpace: 'pre',
          }}
        >
          {line}
        </text>
      ))}
    </>
  );
};

export default DynamicTextBox;