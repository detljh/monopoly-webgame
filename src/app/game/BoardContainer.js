import BoardComponent from './BoardComponent';
import { connect } from 'react-redux';
import { gameOperations } from './duck';

const mapStateToProps = (state) => {
    return {
        squares: state.game.squares,
        players: state.game.players,
        currentDice: state.game.currentDice,
        card: state.game.card,
        display: state.game.display,
        freeParking: state.game.freeParking
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(BoardComponent);
export default BoardContainer;