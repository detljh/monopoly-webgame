import React from 'react';
import './board.scss';
import Square from './SquareComponent';
import gameState from './utilities/gameState';
import exitCondition from './utilities/exitCondition';
import Card from './CardContainer';

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
                        playersOnSquare.push(player.name);
                    }
                });
                console.log(element);
                return <Square key={element[0]} id={element[0]} type={element[1].type} subtype={element[1].subtype} text={element[1].text} cost={element[1].cost} rent={element[1].rent} house={element[1].house} hotel={element[1].hotel} playersOnSquare={playersOnSquare} owned={element[1].owned} playerOwned={element[1].playerOwned} />
            } else {
                return (<div key="middle" id={element[0]}>
                    {
                        this.props.display.length > 0 ? <h2>{this.props.display}</h2>

                        : [
                        
                            this.props.gameState != gameState.CHOOSING_ACTION &&
                            [
                                <p key="dice-1"><b>Dice 1:</b> {this.props.currentDice[0]}</p>,
                                <p key="dice-2"><b>Dice 2:</b> {this.props.currentDice[1]}</p>
                            ],
                        

                            this.props.exitConditions.map((condition, index) => 
                                [condition === exitCondition.ROLL_DICE &&
                                <button key={condition} onClick={this.props.rollDice}>Roll Dice</button>, 

                                condition === exitCondition.TRADE &&
                                <button key={condition}>Trade</button>, 
                                
                                condition === exitCondition.BUY_PROPERTY && 
                                <button key={condition} onClick={this.props.buyProperty}>Buy</button>,

                                condition === exitCondition.PAY_RENT &&
                                <button key={condition} onClick={this.props.payRent}>Pay Rent</button>,

                                condition === exitCondition.PAY_TAX &&
                                <button key={condition} onClick={this.props.payTax}>Pay Tax</button>,

                                condition === exitCondition.DRAW_CHANCE &&
                                <button key={condition} onClick={() => this.props.drawCard(condition)}>Draw chance card</button>,

                                condition === exitCondition.DRAW_CHEST &&
                                <button key={condition} onClick={() => this.props.drawCard(condition)}>Draw community chest card</button>,

                                condition === exitCondition.BUY_HOUSE &&
                                <button key={condition}>Buy houses</button>,

                                condition === exitCondition.PAY_BAIL &&
                                <button key={condition} onClick={this.props.payBail}>PAY BAIL</button>,

                                condition === exitCondition.END_TURN &&
                                <button key={condition} onClick={this.props.endTurn}>End turn</button>
                                ]
                            ),
                        
                            this.props.card.type.length > 0 &&
                            <Card />
                        ]
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