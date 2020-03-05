import React from 'react';
import './game.scss';
import '../player/player.scss';
import Board from './BoardContainer';
import PlayerInfo from '../player/PlayerInfoComponent';

class GameComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="player-info-bar">
                    {this.props.players.map((element, index) => 
                        <PlayerInfo key={element.name} name={index + 1} id={element.name} currentPlayer={element.name == this.props.currentPlayer.name ? true : false} money={element.money}/>
                    )}
                </div>
    
                <button onClick={this.props.newGame}>New Game</button>
                <Board />
            </div>
        );
    }   
}

export default GameComponent;