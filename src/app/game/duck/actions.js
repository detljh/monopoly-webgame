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

const doubleDice = () => {
    return {
        type: types.DOUBLE_DICE
    }
}

const resetDoubleDice = () => {
    return {
        type: types.RESET_DOUBLE_DICE
    }
}

const movePlayer = (players, currentPosition, currentSquare) => {
    return {
        type: types.MOVE_PLAYER,
        players: players,
        currentPosition: currentPosition,
        currentSquare: currentSquare
    }
}

const updatePlayers = (players) => {
    return {
        type: types.UPDATE_PLAYERS,
        players: players
    }
}

const buyProperty = (players, squares) => {
    return {
        type: types.BUY_PROPERTY,
        players: players,
        squares: squares
    }
}

const updateCard = (card) => {
    return {
        type: types.UPDATE_CARD,
        card: card
    }
}

const updateDisplay = (display) => {
    return {
        type: types.UPDATE_DISPLAY,
        display: display
    }
}

const resetDice = () => {
    return {
        type: types.RESET_DICE
    }
}

export default { 
    changeGameState,
    endTurn,
    startGame,
    newGame,
    rollDice,
    movePlayer,
    updatePlayers,
    updateCard,
    buyProperty,
    doubleDice,
    resetDoubleDice,
    updateDisplay,
    resetDice
};