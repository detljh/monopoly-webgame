import BoardComponent from './BoardComponent';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        squares: state.game.squares,
        players: state.game.players,
        currentDice: state.game.currentDice,
        card: state.game.card,
        display: state.game.display,
        freeParking: state.game.freeParking,
        gameState: state.game.gameState,
        winners: state.game.winners,
        currentPlayer: state.game.currentPlayer
    }
}

const BoardContainer = connect(mapStateToProps, null)(BoardComponent);
export default BoardContainer;