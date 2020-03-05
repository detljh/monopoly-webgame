import Creators from './actions.js';
import gameState from '../utilities/gameState.js';
import exitCondition from '../utilities/exitCondition.js';
import squares from '../utilities/boardSquareData';

const NUMBER_POSITIONS = 40;
const stateExitMap = {
    [gameState.CHOOSING_ACTION]: [exitCondition.ROLL_DICE, exitCondition.TRADE],
    [gameState.ROLLING_DICE]: [],
    [gameState.TRADING]: [],
    [gameState.ON_CHANCE]: [exitCondition.PICK_CARD],
    [gameState.ON_CHEST]: [exitCondition.PICK_CARD],
    [gameState.ON_FREE_PROPERTY]: [exitCondition.BUY_PROPERTY, exitCondition.END_TURN],
    [gameState.ON_OWNED_PROPERTY]: [exitCondition.PAY_RENT],
    [gameState.ON_OWN_PROPERTY]: [exitCondition.END_TURN],
    [gameState.ON_TAX]: [exitCondition.PAY_TAX]
};

const endTurn = () => {
    return (dispatch) => {
        dispatch(Creators.endTurn());
        dispatch(Creators.changeGameState(gameState.CHOOSING_ACTION, stateExitMap[gameState.CHOOSING_ACTION]));
    }
};


const startGame = (players) => {
    return (dispatch) => {
        players = players.map(player => {
            return {
                name: player,
                money: 1500,
                properties: [],
                position: 0
            } 
        });
        dispatch(Creators.startGame(players));
    }
} 

const newGame = (ownProps) => {
    return (dispatch) => {
        dispatch(Creators.newGame());
        ownProps.history.push('/');
    }
}

const buyProperty = () => {
    return (dispatch, getState) => {
        const players = [...getState().game.players];
        let updatePlayer = players[getState().game.currentPlayerIndex];
        updatePlayer.money -= getState().game.currentSquare.cost;
        updatePlayer.properties.push(getState().game.currentPosition);
        dispatch(Creators.buyProperty(players));  
        dispatch(Creators.changeGameState(gameState.ON_OWN_PROPERTY, stateExitMap[gameState.ON_OWN_PROPERTY]));
    }
}

const rollDice = () => {
    return (dispatch, getState) => {
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        dispatch(Creators.rollDice([dice1, dice2]));
        dispatch(Creators.changeGameState(gameState.ROLLING_DICE, stateExitMap[gameState.ROLLING_DICE]));

        setTimeout(() => {
            const players = [...getState().game.players];
            let updatePlayer = players[getState().game.currentPlayerIndex];
            let currentPosition = (updatePlayer.position + dice1 + dice2) % NUMBER_POSITIONS;
            updatePlayer.position = currentPosition
            let currentSquare = squares[currentPosition];
            dispatch(Creators.movePlayer(players, currentPosition, currentSquare));
            
            let currentPlayer = getState().game.currentPlayer;
            let freeProperty = true;
            players.forEach(player => {
                if (player.properties.includes(currentPosition)) {
                    freeProperty = false;
                    if (player.name == currentPlayer.name) {
                        dispatch(Creators.changeGameState(gameState.ON_OWN_PROPERTY, stateExitMap[gameState.ON_OWN_PROPERTY]));
                    } else {
                        dispatch(Creators.changeGameState(gameState.ON_OWNED_PROPERTY, stateExitMap[gameState.ON_OWNED_PROPERTY]));
                    }
                }
            })

            if (freeProperty) {
                dispatch(Creators.changeGameState(gameState.ON_FREE_PROPERTY, stateExitMap[gameState.ON_FREE_PROPERTY]));
            }
        }, 1000);
    }
}

export default {
    endTurn,
    startGame,
    buyProperty,
    newGame,
    rollDice
};