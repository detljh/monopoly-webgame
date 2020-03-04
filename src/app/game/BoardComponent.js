import React from 'react';
import './board.scss';
import SquareComponent from './SquareComponent';
import squares from './utilities/boardSquareData.js';

const BoardComponent = (props) => {
    return (
        <div id="board">
            {squares.map((element, index) => 
                <SquareComponent key={index} type={element.type} subtype={element.subtype} text={element.text} cost={element.cost} rent={element.rent} house={element.house} hotel={element.hotel} />)}
        </div>
    );
}

export default BoardComponent;