import types from './types.js';

const endTurn = () => {
    return {
        type: types.END_TURN
    }
}

const startGame = (players) => {
    return {
        type: types.START_GAME,
        players: players
    }
}

const newGame = () => {
    return {
        type: types.NEW_GAME,
    }
}

const rollDice = (dice) => {
    return {
        type: types.ROLL_DICE,
        dice: dice
    }
}

const subtractMoney = (players) => {
    return {
        type: types.SUBTRACT_MONEY,
        players: players
    }
}

export default { 
    endTurn,
    startGame,
    subtractMoney,
    newGame,
    rollDice
};