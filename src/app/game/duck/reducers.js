import types from './types.js';
import gameState from '../utilities/gameState';
import exitCondition from '../utilities/exitCondition.js';

const INITIAL_STATE = {
    gameState: gameState.CHOOSING_ACTION,
    exitConditions: [exitCondition.ROLL_DICE, exitCondition.TRADE],
    currentPlayerIndex: 0,
    players: [],
    currentPlayer: '',
    currentDice: [],
    currentPosition: 0,
    currentSquare: ''
};

const gameReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case types.START_GAME:
            return Object.assign({}, state, {
                currentPlayer: action.players[state.currentPlayerIndex],
                players: action.players
            })
        case types.NEW_GAME:
            return INITIAL_STATE;
        case types.CHANGE_GAME_STATE:
            return Object.assign({}, state, {
                gameState: action.gameState,
                exitConditions: action.exitConditions
            })
        case types.END_TURN:
            return Object.assign({}, state, {
                currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
                currentPlayer: state.players[(state.currentPlayerIndex + 1) % state.players.length],
            })
        case types.ROLL_DICE:
            return Object.assign({}, state, {
                currentDice: action.dice,
            })
        case types.MOVE_PLAYER:
            return Object.assign({}, state, {
                players: action.players,
                currentPosition: action.currentPosition,
                currentSquare: action.currentSquare
            });
        case types.BUY_PROPERTY:
            return Object.assign({}, state, {
                players: action.players
            })
        default:       
            return state;
    };
};

export default gameReducer;