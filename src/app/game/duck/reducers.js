import types from './types.js';
import gameState from '../utilities/gameState';
import { squares } from '../utilities/boardSquareData';

const INITIAL_STATE = {
    squares: squares,
    gameState: gameState.CHOOSING_ACTION,
    prevGameState: gameState.CHOOSING_ACTION,
    exitConditions: [],
    currentPlayerIndex: 0,
    players: [],
    currentPlayer: '',
    currentDice: [],
    currentPosition: 0,
    currentSquare: '',
    card: {
        type: ''
    },
    doubleDice: 0,
    display: '',
    menu: [],
    tradeItems: [],
    tradeMoney: 0,
    tradePlayerIndex: '',
    tradePlayer: '',
    freeParking: 0,
    winners: []
};

const gameReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case types.END_GAME:
            return Object.assign({}, state, {
                currentDice: [],
                winners: [...action.winners]
            })
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
                exitConditions: action.exitConditions,
                prevGameState: action.prevState
            })
        case types.UPDATE_DISPLAY:
            return Object.assign({}, state, {
                display: action.display
            })
        case types.END_TURN:
            return Object.assign({}, state, {
                currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
                currentPlayer: state.players[(state.currentPlayerIndex + 1) % state.players.length],
            })
        case types.ROLL_DICE:
            return Object.assign({}, state, {
                currentDice: [...action.dice],
            })
        case types.MOVE_PLAYER:
            return Object.assign({}, state, {
                players: [...action.players],
                currentPosition: action.currentPosition,
                currentSquare: state.squares[action.currentPosition]
            });
        case types.UPDATE_PLAYERS:
            return Object.assign({}, state, {
                players: [...action.players]
            })
        case types.BUY_OR_SELL:
            return Object.assign({}, state, {
                players: [...action.players],
                squares: action.squares
            })
        case types.UPDATE_CARD:
            return Object.assign({}, state, {
                card: action.card
            })
        case types.DOUBLE_DICE:
            return Object.assign({}, state, {
                doubleDice: state.doubleDice + 1
            })
        case types.RESET_DOUBLE_DICE:
            return Object.assign({}, state, {
                doubleDice: 0
            })
        case types.RESET_DICE:
            return Object.assign({}, state, {
                currentDice: []
            })
        case types.UPDATE_MENU:
            return Object.assign({}, state, {
                menu: action.menu
            })
        case types.UPDATE_FREE_PARKING:
            return Object.assign({}, state, {
                freeParking: action.money
            })
        case types.UPDATE_TRADE_ITEMS:
            return Object.assign({}, state, {
                tradeItems: action.items,
                tradeMoney: action.money
            })
        case types.SET_TRADE_PLAYER:
            return Object.assign({}, state, {
                tradePlayerIndex: action.playerIndex,
                tradePlayer: action.player
            })
        default:       
            return state;
    };
};

export default gameReducer;