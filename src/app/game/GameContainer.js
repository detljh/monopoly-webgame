import GameComponent from './GameComponent';
import { connect } from 'react-redux';
import { gameOperations } from './duck';

const mapStateToProps = (state) => {
    return {
        players: state.game.players,
        currentPlayer: state.game.currentPlayer,
        gameState: state.game.gameState,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        newGame: () => {
            dispatch(gameOperations.newGame(ownProps));
        },
        endGame: () => {
            dispatch(gameOperations.endGame());
        },
        giveUp: () => {
            dispatch(gameOperations.giveUp());
        }
    }
}

const GameContainer = connect(mapStateToProps, mapDispatchToProps)(GameComponent);
export default GameContainer;