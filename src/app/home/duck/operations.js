import Creators from './actions.js';

const startGame = Creators.startGame;
const addPlayer = (id) => {
    return (dispatch, getState) => {
        const currentPlayers = getState().home.currentPlayers;
        if (currentPlayers.includes(id)) {
            return;
        } else {
            dispatch(Creators.addPlayer(id));
        }
    }
};

const removePlayer = (id) => {
    return (dispatch) => {
        dispatch(Creators.removePlayer(id));
    }
};

export default {
    addPlayer,
    startGame,
    removePlayer
};