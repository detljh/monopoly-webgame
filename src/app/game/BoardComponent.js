import React from 'react';
import './board.scss';
import SquareComponent from './SquareComponent';
import squares from './utilities/boardSquareData.js';
import gameState from './utilities/gameState';
import exitCondition from './utilities/exitCondition';

class BoardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let currentCost = 0;
        let board = Object.entries(squares).map((element) => {
            if (element[1].type != 'middle') {
                let playersOnSquare = [];
                this.props.players.forEach(player => {
                    if (element[0] == player.position) {
                        playersOnSquare.push(player.name);
                    }
                });

                if (this.props.currentPosition == element[0]) {
                    currentCost = element[1].cost;
                }
                
                return <SquareComponent key={element[0]} id={element[0]} type={element[1].type} subtype={element[1].subtype} text={element[1].text} cost={element[1].cost} rent={element[1].rent} house={element[1].house} hotel={element[1].hotel} playersOnSquare={playersOnSquare} />
            } else {
                return (<div id={element[0]}>
                    {
                        this.props.gameState == gameState.CHOOSING_ACTION &&
                        <button onClick={this.props.rollDice}>Roll Dice</button>
                    }

                    {
                        this.props.gameState != gameState.CHOOSING_ACTION &&
                        [
                            <p><b>Dice 1:</b> {this.props.currentDice[0]}</p>,
                            <p><b>Dice 2:</b> {this.props.currentDice[1]}</p>
                        ]
                    } 

                    {
                        this.props.gameState == gameState.DICE_ROLLED && 
                        <button onClick={() => {this.props.subtractMoney(currentCost)}}>Buy</button>
                    }
                    <button onClick={this.props.endTurn}>End turn</button>
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