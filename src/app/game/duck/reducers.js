import types from './types.js';
import gameState from '../utilities/gameState';

const INITIAL_STATE = {
    gameState: gameState.CHOOSING_ACTION,
    currentPlayerIndex: 0,
    players: [],
    currentPlayer: '',
    currentDice: []
};

const gameReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case types.START_GAME:
            return Object.assign({}, state, {
                currentPlayer: action.players[state.currentPlayerIndex],
                players: action.players.map(player => {
                    return {
                        name: player,
                        money: 1500,
                        properties: [],
                        position: 0
                    } 
                })
            })
        case types.NEW_GAME:
            return INITIAL_STATE;
        case types.END_TURN:
            return Object.assign({}, state, {
                currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
                currentPlayer: state.players[(state.currentPlayerIndex + 1) % state.players.length].name,
                gameState: gameState.CHOOSING_ACTION 
            })
        case types.ROLL_DICE:
            return Object.assign({}, state, {
                currentDice: action.dice,
                gameState: gameState.ROLLING_DICE
            })
        case types.MOVE_PLAYER:
            return Object.assign({}, state, {
                players: action.players
            });
        case types.SUBTRACT_MONEY:
            return Object.assign({}, state, {
                players: action.players
            })
        default:       
            return state;
    };
};

export default gameReducer;