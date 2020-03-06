import BoardComponent from './BoardComponent';
import { connect } from 'react-redux';
import { gameOperations } from './duck';

const mapStateToProps = (state) => {
    return {
        squares: state.game.squares,
        players: state.game.players,
        currentPlayer: state.game.currentPlayer,
        gameState: state.game.gameState,
        currentDice: state.game.currentDice,
        currentPosition: state.game.currentPosition,
        exitConditions: state.game.exitConditions,
        card: state.game.card,
        display: state.game.display
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
        }
    }
}

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(BoardComponent);
export default BoardContainer;