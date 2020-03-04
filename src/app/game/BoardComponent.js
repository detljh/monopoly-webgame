import React from 'react';
import './board.scss';
import SquareComponent from './SquareComponent';
import squares from './utilities/boardSquareData.js';
import gameState from './utilities/gameState';

const BoardComponent = (props) => {
    return (
        <div id="board">
            {squares.map((element, index) => 
                element.type != 'middle' ?
                <SquareComponent key={index} type={element.type} subtype={element.subtype} text={element.text} cost={element.cost} rent={element.rent} house={element.house} hotel={element.hotel} />
                : <div id={element.type}>
                    {
                        props.gameState == gameState.CHOOSING_ACTION &&
                        <button onClick={props.rollDice}>Roll Dice</button>
                    }

                    {
                        props.gameState == gameState.ROLLING_DICE &&
                        [
                            <p><b>Dice 1:</b> {props.currentDice[0]}</p>,
                            <p><b>Dice 2:</b> {props.currentDice[1]}</p>
                        ]
                    }       
                </div>
            )}
        </div>
    );
}

export default BoardComponent;