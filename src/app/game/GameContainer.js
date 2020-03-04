import GameComponent from './GameComponent';
import { connect } from 'react-redux';
import { gameOperations } from './duck';

const mapStateToProps = (state) => {
    return {
        players: state.game.players,
        currentPlayer: state.game.currentPlayer
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
        subtractMoney: (money) => {
            dispatch(gameOperations.subtractMoney(money));
        }
    }
}

const GameContainer = connect(mapStateToProps, mapDispatchToProps)(GameComponent);
export default GameContainer;