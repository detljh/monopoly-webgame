import HomeComponent from './HomeComponent';
import { connect } from 'react-redux';
import { homeOperations } from './duck';
import { gameOperations } from '../game/duck';

const mapStateToProps = (state) => {
    return {
        currentPlayers: state.home.currentPlayers
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addPlayer: (id) => {
            dispatch(homeOperations.addPlayer(id));
        },
        removePlayer: (id) => {
            dispatch(homeOperations.removePlayer(id));
        },
        startGame: (players) => {
            dispatch(gameOperations.startGame(players, ownProps));
        }
    }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
export default HomeContainer;