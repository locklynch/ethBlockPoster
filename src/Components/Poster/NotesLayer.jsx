import React from 'react';
import DynamicTextBox from './DynamicTextBox';



const NotesLayer = ({ textBoxes, onTextBoxMove }) => {
    return (
        <>
          {textBoxes.map((textBox) => (
            <DynamicTextBox key={textBox.id} {...textBox} onMove={onTextBoxMove} />
          ))}
        </>
      );
    };

export default NotesLayer;
