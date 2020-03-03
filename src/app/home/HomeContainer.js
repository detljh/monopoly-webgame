import HomeComponent from './HomeComponent';
import { connect } from 'react-redux';
import { homeOperations } from './duck';

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
        startGame: () => {
            dispatch(homeOperations.startGame());
        }
    }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
export default HomeContainer;