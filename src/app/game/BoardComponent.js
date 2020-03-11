import React from 'react';
import './board.scss';
import Square from './SquareComponent';
import PlayerMoves from './PlayerMovesContainer';

class BoardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
 
                return <Square key={element[0]} id={element[0]} playersOnSquare={playersOnSquare} square={element[1]} freeParking={freeParking}/>
            } else {
                return (<div key="middle" id={element[0]}>
                    {
                        this.props.currentDice.length > 0 &&
                            [
                                <p key="dice-1"><b>Dice 1:</b> {this.props.currentDice[0]}</p>,
                                <p key="dice-2"><b>Dice 2:</b> {this.props.currentDice[1]}</p>
                            ]
                    }

                    {
                        this.props.display.length > 0 ? <h2>{this.props.display}</h2>

                        : 

                        <PlayerMoves />
                    }
                    </div>  
                )}
        });

        return (
            <div key="board" id="board">
                {board}
            </div>
        );
    }
}

export default BoardComponent;