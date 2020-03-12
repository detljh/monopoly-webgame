import React from 'react';
import './game.scss';
import Board from './BoardContainer';
import PlayerInfo from '../player/PlayerInfoComponent';

class GameComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>    
                <div id="game-header">
                    <button onClick={this.props.newGame} className="main-buttons">New Game</button>
                    <div className="player-info-bar">
                        {this.props.players.map((element) => 
                            <PlayerInfo key={element.id} player={element} currentPlayer={element.id == this.props.currentPlayer.id ? true : false} money={element.money}/>
                        )}
                    </div>
                </div>
                
                <div id="game-board">
                    <Board />
                </div>
            </div>
        );
    }   
}

export default GameComponent;