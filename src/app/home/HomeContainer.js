import HomeComponent from './HomeComponent';
import { connect } from 'react-redux';
import { homeOperations } from './duck';
import { gameOperations } from '../game/duck';

const mapStateToProps = (state) => {
    return {
        currentPlayers: state.home.currentPlayers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPlayer: (id) => {
            dispatch(homeOperations.addPlayer(id));
        },
        startGame: (players) => {
            dispatch(gameOperations.startGame(players));
        }
    }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
export default HomeContainer;