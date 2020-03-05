import BoardComponent from './BoardComponent';
import { connect } from 'react-redux';
import { gameOperations } from './duck';

const mapStateToProps = (state) => {
    console.log(state.game.currentPlayer);
    return {
        players: state.game.players,
        currentPlayer: state.game.currentPlayer,
        gameState: state.game.gameState,
        currentDice: state.game.currentDice,
        currentPosition: state.game.currentPosition,
        exitConditions: state.game.exitConditions
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        endTurn: () => {
            dispatch(gameOperations.endTurn(ownProps));
        },
        rollDice: () => {
            dispatch(gameOperations.rollDice());
        },
        buyProperty: () => {
            dispatch(gameOperations.buyProperty());
        }
    }
}

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(BoardComponent);
export default BoardContainer;