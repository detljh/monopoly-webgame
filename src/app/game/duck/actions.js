import types from './types.js';

const endTurn = () => {
    return {
        type: types.END_TURN
    }
}

const changeGameState = (gameState, exitConditions) => {
    return {
        type: types.CHANGE_GAME_STATE,
        gameState: gameState,
        exitConditions: exitConditions
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

const movePlayer = (players, currentPosition) => {
    return {
        type: types.MOVE_PLAYER,
        players: players,
        currentPosition: currentPosition
    }
}

const subtractMoney = (players) => {
    return {
        type: types.SUBTRACT_MONEY,
        players: players
    }
}

export default { 
    changeGameState,
    endTurn,
    startGame,
    subtractMoney,
    newGame,
    rollDice,
    movePlayer
};