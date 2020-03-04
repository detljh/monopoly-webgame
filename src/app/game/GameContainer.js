import GameComponent from './GameComponent';
import { connect } from 'react-redux';
import { gameOperations } from './duck';

const mapStateToProps = (state) => {
    return {
        players: state.game.players,
        currentPlayer: state.game.players[state.game.currentPlayerIndex].name
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        endTurn: () => {
            dispatch(gameOperations.endTurn());
        },
        subtractMoney: (money) => {
            dispatch(gameOperations.subtractMoney(money));
        }
    }
}

const GameContainer = connect(mapStateToProps, mapDispatchToProps)(GameComponent);
export default GameContainer;