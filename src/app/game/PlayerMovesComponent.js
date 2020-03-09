import React from 'react';
import Card from './CardContainer';
import exitCondition from './utilities/exitCondition';
import './player-moves.scss';

class PlayerMoversComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            property: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            property: event.target.value
        });
    }

    render() {
        return (
        <div className="player-moves">
        {
            this.props.card.type.length > 0 ? <Card key={this.props.card.text}/>
            :
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

                    condition === exitCondition.BUY_HOUSE &&
                    <button key={condition} onClick={this.props.buyHouseMenu}>Buy houses</button>,

                    condition === exitCondition.USE_JAIL_CARD &&
                    <button key={condition} onClick={this.props.useJailCard}>Use Jail Card</button>,

                    condition === exitCondition.PAY_BAIL &&
                    <button key={condition} onClick={this.props.payBail}>PAY BAIL</button>,

                    condition === exitCondition.END_TURN &&
                    <button key={condition} onClick={this.props.endTurn}>End turn</button>,

                    condition === exitCondition.BUY_HOUSE_MENU &&
                    <div key={'buy-house-form'} id="buy-house">
                        <select name="property" size={this.props.fullStreetProperties.length + 2} onChange={this.handleChange}>
                            <option id="header-option" disabled>Available houses and hotels</option>
                            {
                                this.props.fullStreetProperties.map((option) =>
                                    <option key={option.propertyPosition} value={option.propertyPosition}>{option.name}, {option.type}, ${option.cost}</option>
                                )
                            }
                        </select>

                        <div id="buy-house-buttons">
                            <button key={'buy-house-back'} onClick={this.props.goPrevGameState}>Back</button>
                            <button key={'buy-house-buy'} onClick={() => this.props.buyHouse(this.state.property)}>Buy</button>
                        </div>
                    </div>
                    ]
                )
            ]
        }
        </div>
        );
    }
}

export default PlayerMoversComponent;