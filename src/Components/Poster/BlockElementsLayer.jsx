import React from 'react';
import DynamicTextBox from '../DynamicTextBox';



const BlockElementsLayer = ({ textBoxes, onTextBoxMove }) => {
    return (
        <>
          {textBoxes.map((textBox) => (
            <DynamicTextBox key={textBox.id} {...textBox} onMove={onTextBoxMove} />
          ))}
        </>
      );
    };

export default BlockElementsLayer;
