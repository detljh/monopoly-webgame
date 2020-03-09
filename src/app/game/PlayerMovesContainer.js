import PlayerMovesComponent from './PlayerMovesComponent';
import { connect } from 'react-redux';
import { gameOperations } from './duck';

const mapStateToProps = (state) => {
    return {
        exitConditions: state.game.exitConditions,
        card: state.game.card,
        fullStreetProperties: state.game.fullStreetProperties
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
        }
    }
}

const PlayerMovesContainer = connect(mapStateToProps, mapDispatchToProps)(PlayerMovesComponent);
export default PlayerMovesContainer;