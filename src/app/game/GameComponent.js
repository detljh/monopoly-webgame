import React from 'react';
import './game.scss';
import Board from './BoardContainer';
import PlayerInfo from '../player/PlayerInfoComponent';
import gameState from './utilities/gameState';

class GameComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let disabled = this.props.gameState === gameState.END_GAME ? true : false;
        return (
            <div id="game-page" className="transition-item">    
                <div id="game-header">
                    <button onClick={this.props.newGame} className="main-buttons">New Game</button>
                    <button onClick={this.props.endGame} className={`main-buttons disabled-${disabled}`} disabled={disabled}>End Game</button>
                    <button className={`main-buttons disabled-${disabled}`} id="give-up-button" onClick={this.props.giveUp} disabled={disabled}>Give Up</button>
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