import types from './types.js';

const addPlayer = (id) => {
    return {
        type: types.ADD_PLAYER,
        player: id
    };
}

const removePlayer = (id) => {
    return {
        type: types.REMOVE_PLAYER,
        player: id
    };
}

const startGame = () => {
    return {
        type: types.START_GAME
    }
}

export default { 
    addPlayer,
    removePlayer,
    startGame
};