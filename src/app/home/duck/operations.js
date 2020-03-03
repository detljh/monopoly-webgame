import Creators from './actions.js';

const startGame = Creators.startGame;
const addPlayer = (id) => {
    return (dispatch, getState) => {
        const currentPlayers = getState().home.currentPlayers;
        if (currentPlayers.includes(id)) {
            dispatch(Creators.removePlayer(id));
        } else {
            dispatch(Creators.addPlayer(id));
        }
    }
};

export default {
    addPlayer,
    startGame
};