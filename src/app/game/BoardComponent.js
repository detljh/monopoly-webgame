import React from 'react';
import './board.scss';
import SquareComponent from './SquareComponent';
import squares from './utilities/boardSquareData.js';
import gameState from './utilities/gameState';

class BoardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let board = squares.map((element) => {
            if (element.type != 'middle') {
                let playersOnSquare = [];
                this.props.players.forEach(player => {
                    if (element.position == player.position) {
                        playersOnSquare.push(player.name);
                    }
                });
                
                return <SquareComponent key={element.position} type={element.type} subtype={element.subtype} text={element.text} cost={element.cost} rent={element.rent} house={element.house} hotel={element.hotel} playersOnSquare={playersOnSquare}/>
            } else {
                return (<div id={element.type}>
                    {
                        this.props.gameState == gameState.CHOOSING_ACTION &&
                        <button onClick={this.props.rollDice}>Roll Dice</button>
                    }

                    {
                        this.props.gameState == gameState.ROLLING_DICE &&
                        [
                            <p><b>Dice 1:</b> {this.props.currentDice[0]}</p>,
                            <p><b>Dice 2:</b> {this.props.currentDice[1]}</p>
                        ]
                    } 
                    </div>  
                )}
        });

        return (
            <div id="board">
                {board}
            </div>
        );
    }
}

export default BoardComponent;