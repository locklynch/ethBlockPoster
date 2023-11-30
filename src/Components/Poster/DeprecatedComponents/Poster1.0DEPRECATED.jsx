// Poster.jsx
import React, {useState, useEffect} from 'react';
import DynamicTextBox from '../DynamicTextBox';
// import NotesLayer from './NotesLayer';
// import BlockElementsLayer from './BlockElementsLayer';
import BlockData from '../BlockData';

const Poster = ({ blockInfo }) => {
  
  // Text boxes for NotesLayer
  const [noteTextBoxes, setNoteTextBoxes] = useState([
    // { id: '1', x: 100, y: 100, text: 'Text Box 1' },
    // { id: '2', x: 200, y: 200, text: 'Text Box 2' },
    // // Add more text boxes for NotesLayer as needed
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('./staticText.json');
        // const data = await response.json();
        // console.log(data)

        // // Process the data from staticText.json and create the noteTextBoxes array
        // const newNoteTextBoxes = data.notes.map(({ id, text }, index) => ({
        //   id: `${index + 1}`, // You can use a more meaningful ID if needed
        //   x: 100 + index * 100, // Adjust the starting position as needed
        //   y: 100 + index * 50, // Adjust the starting position as needed
        //   text,
        // }));

        // setNoteTextBoxes(newNoteTextBoxes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that useEffect runs once after the initial render

  // Text boxes for BlockElementsLayer
  const [blockTextBoxes, setBlockTextBoxes] = useState([
    // Add text boxes for BlockElementsLayer here
    { id: '3', x: 300, y: 300, text: 'Text Box 3' },
    { id: '4', x: 400, y: 400, text: 'Text Box 4' },
  ]);

  const handleTextBoxMove = (id, newPosition, setTextBoxes) => {
    setTextBoxes((prevTextBoxes) =>
      prevTextBoxes.map((textbox) =>
        textbox.id === id ? { ...textbox, ...newPosition } : textbox
      )
    );
  };

  return (
    <div className="poster">
      <div className="poster-container">
      <svg width="1000" height="1414" viewBox="0 0 1000 1414" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="1000" height="1414" fill="#1E1E1E"/>
        {/* the new dynamic poster */}

        {/* <NotesLayer textBoxes={noteTextBoxes} onTextBoxMove={(id, newPosition) => handleTextBoxMove(id, newPosition, setNoteTextBoxes)} /> */}
        {/* <BlockElementsLayer textBoxes={blockTextBoxes} onTextBoxMove={(id, newPosition) => handleTextBoxMove(id, newPosition, setBlockTextBoxes)} /> */}
        {blockInfo && <BlockData blockInfo={blockInfo}/>}


        {/* the old static poster */}
        {/* <rect x="0.5" y="0.5" width="999" height="1413" fill="black"/>
        <rect x="0.5" y="0.5" width="999" height="1413" stroke="black"/>
        <rect width="1000" height="1414" fill="#171717"/>
        <rect x="23" y="38" width="98" height="148" fill="black" stroke="white" stroke-width="2"/>
        <rect x="23" y="208" width="98" height="148" fill="black" stroke="white" stroke-width="2"/>
        <rect x="23" y="378" width="98" height="148" fill="black" stroke="white" stroke-width="2"/>
        <rect x="23" y="548" width="98" height="148" fill="black" stroke="white" stroke-width="2"/>
        <rect x="23" y="718" width="98" height="148" fill="black" stroke="white" stroke-width="2"/>
        <rect x="23" y="888" width="98" height="148" fill="black" stroke="white" stroke-width="2"/>
        <rect x="23" y="1058" width="98" height="148" fill="black" stroke="white" stroke-width="2"/>
        <rect x="23" y="1228" width="98" height="148" fill="black" stroke="white" stroke-width="2"/>
        <path d="M192.707 120.707C193.098 120.317 193.098 119.683 192.707 119.293L186.343 112.929C185.953 112.538 185.319 112.538 184.929 112.929C184.538 113.319 184.538 113.953 184.929 114.343L190.586 120L184.929 125.657C184.538 126.047 184.538 126.681 184.929 127.071C185.319 127.462 185.953 127.462 186.343 127.071L192.707 120.707ZM162 121L192 121V119L162 119V121Z" fill="white"/>
        <line x1="131" y1="277" x2="162" y2="277" stroke="white" stroke-width="2"/>
        <line x1="162" y1="278" x2="162" y2="119" stroke="white" stroke-width="2"/>
        <rect x="201" y="76" width="698" height="1098" fill="#101010" stroke="white" stroke-width="2"/>
        <g opacity="0.25">
        </g>
        <rect x="200.5" y="75.5" width="699" height="33" fill="#707070" stroke="#F0F0F0"/>
        <rect x="147" y="38" width="731" height="1326.79" fill="#101010" fill-opacity="0.75" stroke="white" stroke-width="2"/>
        <rect x="596.5" y="13.5" width="356" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="573.5" y="72.5" width="411" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="596.5" y="133.5" width="374" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="573.5" y="192.5" width="411" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="596.5" y="251.5" width="365" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="573.5" y="310.5" width="411" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="596.5" y="371.5" width="374" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="573.5" y="430.5" width="411" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="596.5" y="491.5" width="366.908" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="573.5" y="550.5" width="411" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="596.5" y="611.5" width="374" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="573.5" y="670.5" width="411" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="596.5" y="729.5" width="331" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="573.5" y="788.5" width="411" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="596.5" y="849.5" width="284" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="573.5" y="908.5" width="411" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="596.5" y="969.5" width="356" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="573.5" y="1028.5" width="411" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="596.5" y="1089.5" width="374" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="573.5" y="1148.5" width="411" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="596.5" y="1207.5" width="356" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="573.5" y="1266.5" width="411" height="69" fill="black" fill-opacity="0.75" stroke="white"/>
        <rect x="596.5" y="1327.5" width="374" height="69" fill="black" fill-opacity="0.75" stroke="white"/> */}
      </svg>
      </div>
    </div>
  );
};
export default Poster;