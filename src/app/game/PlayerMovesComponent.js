import React from 'react';
import Card from './CardContainer';
import exitCondition from './utilities/exitCondition';
import './player-moves.scss';
import Menu from './MenuComponent';

class PlayerMovesComponent extends React.Component {
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
                    <button key={condition} onClick={() => this.props.chooseTradeItems(undefined)}>Trade</button>, 
                    
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
                    <Menu key={condition} id="buy-house" items={this.props.menu} header="Available houses and hotels" action={this.props.buyHouse} actionText="Buy" back={this.props.goPrevGameState} multiple={false} />,

                    condition === exitCondition.MORTGAGE_MENU &&
                    <Menu key={condition} id="mortgage" items={this.props.menu} header="Available properties (85% of property cost)" action={this.props.mortgage} actionText="Mortgage" back={this.props.goPrevGameState} multiple={false} />,

                    condition === exitCondition.TRADE_MENU &&
                    <Menu key={condition} id="trade" items={this.props.menu} header="First player items to trade (hold CTRL to select more than one item)" action={this.props.choosePlayer} actionText="Choose player to trade with" back={this.props.goPrevGameState} multiple={true} />,

                    condition === exitCondition.CHOOSE_PLAYER_MENU &&
                    <Menu key={condition} id="trade_player" items={this.props.menu} header="Players" action={this.props.chooseTradeItems} actionText="Choose items from player" back={this.props.chooseTradeItems} multiple={false} />,

                    condition === exitCondition.TRADE_MENU_PLAYER_TWO &&
                    <Menu key={condition} id="trade" items={this.props.menu} header="Second player items to trade with (hold CTRL to select more than one item)" action={this.props.trade} actionText="Finish trade" back={this.props.choosePlayer} multiple={true} />
                    ]
                )
            ]
        }
        </div>
        );
    }
}

export default PlayerMovesComponent;