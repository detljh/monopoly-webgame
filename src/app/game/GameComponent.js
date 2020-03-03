import React from 'react';
import './game.scss';
import BoardComponent from './BoardComponent';

const GameComponent = (props) => {
    return (
        <div>
            {props.players}
            <div id="game-board">
                <BoardComponent />
            </div>
        </div>
    );
}

export default GameComponent;