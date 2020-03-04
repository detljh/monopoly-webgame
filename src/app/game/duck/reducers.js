import types from './types.js';
import gameStates from '../utilities/gameStates';

const INITIAL_STATE = {
    gameState: gameStates.CHOOSE_ACTION,
    currentPlayerIndex: 0,
    players: [] 
};

const gameReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case types.START_GAME:
            return Object.assign({}, state, {
                players: action.players.map(player => {
                    return {
                        name: player,
                        money: 1500,
                        properties: []
                    } 
                })
            })
        case types.END_TURN:
            return Object.assign({}, state, {
                currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length
            })
        case types.SUBTRACT_MONEY:
            return Object.assign({}, state, {
                players: action.players
            })
        default:       
            return state;
    };
};

export default gameReducer;