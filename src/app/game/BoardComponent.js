import React from 'react';
import './board.scss';
import Square from './SquareComponent';
import PlayerMoves from './PlayerMovesContainer';
import gameState from './utilities/gameState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons';
import SquareDetails from './SquareDetailsComponent';

class BoardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
            square: {},
            x: 0,
            y: 0
        }

        this.updateHover = this.updateHover.bind(this);
        this.getDiceIcon = this.getDiceIcon.bind(this);
    }

    getDiceIcon(number) {
        if (number == 1) {
            return <FontAwesomeIcon className="dice-icon" icon={faDiceOne}></FontAwesomeIcon>;
        } else if (number == 2) {
            return <FontAwesomeIcon className="dice-icon" icon={faDiceTwo}></FontAwesomeIcon>;
        } else if (number == 3) {
            return <FontAwesomeIcon className="dice-icon" icon={faDiceThree}></FontAwesomeIcon>;
        } else if (number == 4) {
            return <FontAwesomeIcon className="dice-icon" icon={faDiceFour}></FontAwesomeIcon>;
        } else if (number == 5) {
            return <FontAwesomeIcon className="dice-icon" icon={faDiceFive}></FontAwesomeIcon>;
        } else if (number == 6) {
            return <FontAwesomeIcon className="dice-icon" icon={faDiceSix}></FontAwesomeIcon>;
        }
    }

    updateHover(event, value, square) {
        this.setState({
            isHovered: value,
            square: square,
            x: event.pageX,
            y: event.pageY
        });
    }

    render() {
        let winnerText = "";
        if (this.props.gameState === gameState.END_GAME) {
            let winners = this.props.winners;
            if (winners.length === 1) {
                winnerText += `The winner with $${winners[0].money} remaining is`;
            } else {
                winnerText += `The winners with $${winners[0].money} remaining are`;
            }
        }

        let board = Object.entries(this.props.squares).map((element) => {
            if (element[1].type != 'middle') {
                let playersOnSquare = [];
                this.props.players.forEach(player => {
                    if (element[0] == player.position) {
                        playersOnSquare.push(player.id);
                    }
                });

                let freeParking = -1
                if (element[1].subtype === 'free-park') {
                    freeParking = this.props.freeParking;
                }
 
                return <Square updateHover={this.updateHover} key={element[0]} id={element[0]} playersOnSquare={playersOnSquare} currentPlayer={this.props.currentPlayer} square={element[1]} freeParking={freeParking}/>
            } else {
                return (                    
                <div key="middle" id={element[0]}>
                    <div id="middle-options">
                    {
                        this.props.gameState === gameState.END_GAME ? 
                            [
                                <p>{winnerText}</p>,
                                this.props.winners.map(winner => 
                                    <div className="winner">
                                        <div className="winner-name">{winner.name}</div>
                                        <div className="player-icon" id={winner.id}></div>
                                    </div>
                                )
                            ]
                        : 
                        [
                            this.props.currentDice.length > 0 &&
                                <div id="dice-container">
                                    <div className="dice" id="dice-1" key="dice-1">
                                        {this.getDiceIcon(this.props.currentDice[0])}
                                        <b>{this.props.currentDice[0]}</b>
                                    </div>
                                    <div className="dice" id="dice-1" key="dice-2">
                                        {this.getDiceIcon(this.props.currentDice[1])}
                                        <b>{this.props.currentDice[1]}</b>
                                    </div>
                                </div>,
                        
                            this.props.display.length > 0 ? <h2 id="display">{this.props.display}</h2>
                            : 
                            <PlayerMoves />
                        ]
                        }
                    </div>   
                </div>  
                )}
        });

        return (
            <div key="board" id="board">
                {(this.state.isHovered && (this.state.square.type.includes("property") || ["station", "utility"].some(e => this.state.square.subtype.includes(e)))) && <SquareDetails square={this.state.square} x={this.state.x} y={this.state.y} />}
                {board}
            </div>
        );
    }
}

export default BoardComponent;