import React from 'react';
import './board.scss';
import SquareComponent from './SquareComponent';
import squares from './boardSquares.js';

const BoardComponent = (props) => {
    return (
        <div id="board">
            {squares.map(element => 
                <SquareComponent type={element.type} subtype={element.subtype} text={element.text} />)}
        </div>
    );
}

export default BoardComponent;