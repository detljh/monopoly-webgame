import React from 'react';
import Card from './CardContainer';
import exitCondition from './utilities/exitCondition';
import './player-moves.scss';
import Menu from './MenuComponent';

class PlayerMoversComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="player-moves">
        {     
            [
                this.props.exitConditions.map((condition) => 
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

                    condition === exitCondition.COMPLETE_CARD &&
                    <Card key={this.props.card.text}/>,

                    condition === exitCondition.BUY_HOUSE &&
                    <button key={condition} onClick={this.props.buyHouseMenu}>Buy houses</button>,

                    condition === exitCondition.MORTGAGE &&
                    <button key={condition} onClick={this.props.mortgageMenu}>Mortgage</button>,

                    condition === exitCondition.USE_JAIL_CARD &&
                    <button key={condition} onClick={this.props.useJailCard}>Use Jail Card</button>,

                    condition === exitCondition.PAY_BAIL &&
                    <button key={condition} onClick={this.props.payBail}>PAY BAIL</button>,

                    condition === exitCondition.END_TURN &&
                    <button key={condition} onClick={this.props.endTurn}>End turn</button>,

                    condition === exitCondition.BUY_HOUSE_MENU &&
                    <Menu key={condition} id="buy-house" properties={this.props.menu} header="Available houses and hotels" action={this.props.buyHouse} actionText="Buy" goPrevGameState={this.props.goPrevGameState}/>,

                    condition === exitCondition.MORTGAGE_MENU &&
                    <Menu key={condition} id="mortgage" properties={this.props.menu} header="Available properties (85% of property cost)" action={this.props.mortgage} actionText="Mortgage" goPrevGameState={this.props.goPrevGameState} />
                    ]
                )
            ]
        }
        </div>
        );
    }
}

export default PlayerMoversComponent;