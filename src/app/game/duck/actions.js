import types from './types.js';

const endTurn = () => {
    return {
        type: types.END_TURN
    }
}

const changeGameState = (gameState, exitConditions, prevState) => {
    return {
        type: types.CHANGE_GAME_STATE,
        gameState: gameState,
        exitConditions: exitConditions,
        prevState: prevState
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

const giveUp = () => {
    return {
        type: types.GIVE_UP
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

const movePlayer = (players, currentPosition) => {
    return {
        type: types.MOVE_PLAYER,
        players: players,
        currentPosition: currentPosition
    }
}

const updatePlayers = (players) => {
    return {
        type: types.UPDATE_PLAYERS,
        players: players
    }
}

const buyOrSell = (players, squares) => {
    return {
        type: types.BUY_OR_SELL,
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

const updateMenu = (menu) => {
    return {
        type: types.UPDATE_MENU,
        menu: menu
    }
}

const updateFreeParking = (money) => {
    return {
        type: types.UPDATE_FREE_PARKING,
        money: money
    }
}

const updateTradeItems = (items, money) => {
    return {
        type: types.UPDATE_TRADE_ITEMS,
        items: items,
        money: money
    }
}

const setTradePlayer = (player, playerIndex) => {
    return {
        type: types.SET_TRADE_PLAYER,
        player: player,
        playerIndex: playerIndex
    }
}

const endGame = (winners) => {
    return {
        type: types.END_GAME,
        winners: winners
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
    buyOrSell,
    doubleDice,
    resetDoubleDice,
    updateDisplay,
    resetDice,
    updateMenu,
    updateFreeParking,
    updateTradeItems,
    setTradePlayer,
    endGame,
    giveUp
};