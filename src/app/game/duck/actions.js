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

const drawCard = () => {
    return {
        type: types.DRAW_CARD
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
    drawCard,
    buyProperty
};