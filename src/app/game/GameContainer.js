import GameComponent from './GameComponent';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        players: state.home.players
    }
}

const mapDispatchToProps = (dispatch) => {

}

const GameContainer = connect(mapStateToProps, mapDispatchToProps)(GameComponent);
export default GameContainer;