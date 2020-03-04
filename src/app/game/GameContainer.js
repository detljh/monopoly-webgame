import GameComponent from './GameComponent';
import { connect } from 'react-redux';
import { gameOperations } from './duck';

const mapStateToProps = (state) => {
    return {
        players: state.game.players,
        currentPlayer: state.game.currentPlayer,
        gameState: state.game.gameState,
        currentDice: state.game.currentDice
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        newGame: () => {
            dispatch(gameOperations.newGame(ownProps));
        },
        endTurn: () => {
            dispatch(gameOperations.endTurn(ownProps));
        },
        rollDice: () => {
            dispatch(gameOperations.rollDice());
        },
        subtractMoney: (money) => {
            dispatch(gameOperations.subtractMoney(money));
        }
    }
}

const GameContainer = connect(mapStateToProps, mapDispatchToProps)(GameComponent);
export default GameContainer;