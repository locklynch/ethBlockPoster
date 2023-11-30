// the layer of little notes to self and postits on the screen pointing at elements of the "narrative"

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
