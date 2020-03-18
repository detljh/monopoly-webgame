import types from './types.js';

const INITIAL_STATE = { 
    players: [],
    currentPlayers: []
};

const homeReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case types.ADD_PLAYER: 
            return Object.assign({}, state, {
                currentPlayers: [...state.currentPlayers, action.player]
            });
        case types.REMOVE_PLAYER:
            return Object.assign({}, state, {
                currentPlayers: state.currentPlayers.filter(player => player !== action.player)
            })
        case types.START_GAME:
            return Object.assign({}, state, {
                players: state.currentPlayers
            })
        default:       
            return state;
    };
};

export default homeReducer;