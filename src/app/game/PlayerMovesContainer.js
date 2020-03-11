import PlayerMovesComponent from './PlayerMovesComponent';
import { connect } from 'react-redux';
import { gameOperations } from './duck';

const mapStateToProps = (state) => {
    return {
        exitConditions: state.game.exitConditions,
        card: state.game.card,
        menu: state.game.menu,
        currentPlayer: state.game.currentPlayer,
        tradePlayer: state.game.tradePlayer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        endTurn: () => {
            dispatch(gameOperations.endTurn());
        },
        rollDice: () => {
            dispatch(gameOperations.rollDice());
        },
        buyProperty: () => {
            dispatch(gameOperations.buyProperty());
        },
        drawCard: (type) => {
            dispatch(gameOperations.drawCard(type));
        },
        payRent: () => {
            dispatch(gameOperations.payRent());
        },
        payTax: () => {
            dispatch(gameOperations.payTax());
        },
        payBail: () => {
            dispatch(gameOperations.payBail());
        },
        buyHouseMenu: () => {
            dispatch(gameOperations.buyHouseMenu());
        },
        goPrevGameState: () => {
            dispatch(gameOperations.goPrevGameState());
        },
        buyHouse: (property) => {
            dispatch(gameOperations.buyHouse(property));
        },
        useJailCard: () => {
            dispatch(gameOperations.useJailCard());
        },
        mortgageMenu: () => {
            dispatch(gameOperations.mortgageMenu());
        },
        mortgage: (property) => {
            dispatch(gameOperations.mortgage(property));
        },
        chooseTradeItems: (player, money) => {
            dispatch(gameOperations.chooseTradeItems(player, money));
        },
        choosePlayer: (items, money) => {
            dispatch(gameOperations.choosePlayer(items, money));
        },
        trade: (items, money) => {
            dispatch(gameOperations.trade(items, money));
        }
    }
}

const PlayerMovesContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerMovesComponent);
export default PlayerMovesContainer;