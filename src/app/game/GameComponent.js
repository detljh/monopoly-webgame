import React from 'react';
import './game.scss';
import Board from './BoardComponent';
import PlayerInfo from '../player/PlayerInfoComponent';

const GameComponent = (props) => {
    return (
        <div>
            <div className="player-info-bar">
                {props.players.map((element, index) => 
                    <PlayerInfo key={element.name} name={index + 1} id={element.name} currentPlayer={element.name == props.currentPlayer ? true : false } money={element.money}/>
                )}
            </div>

            <button onClick={props.endTurn}>End turn</button>
            <button onClick={() => {props.subtractMoney(100)}}>Buy</button>
            <div id="game-board">
                <Board />
            </div>
        </div>
    );
}

export default GameComponent;