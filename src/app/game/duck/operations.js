import Creators from './actions.js';
import gameState from '../utilities/gameState.js';
import exitCondition from '../utilities/exitCondition.js';
import cardData from '../utilities/cardData';

const NUMBER_POSITIONS = 40;
const stateExitMap = {
    [gameState.CHOOSING_ACTION]: [exitCondition.ROLL_DICE, exitCondition.TRADE, exitCondition.BUY_HOUSE],
    [gameState.ROLLING_DICE]: [],
    [gameState.TRADING]: [],
    [gameState.ON_CHANCE]: [exitCondition.DRAW_CHANCE],
    [gameState.ON_CHEST]: [exitCondition.DRAW_CHEST],
    [gameState.ON_FREE_PROPERTY]: [exitCondition.BUY_PROPERTY, exitCondition.BUY_HOUSE, exitCondition.END_TURN],
    [gameState.ON_OWNED_PROPERTY]: [exitCondition.PAY_RENT],
    [gameState.ON_OWN_PROPERTY]: [exitCondition.BUY_HOUSE, exitCondition.END_TURN],
    [gameState.ON_TAX]: [exitCondition.PAY_TAX],
    [gameState.END_OF_TURN]: [exitCondition.BUY_HOUSE, exitCondition.END_TURN],
    [gameState.IN_JAIL]: [exitCondition.END_TURN],
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
                position: 0,
                jailTurns: 0
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
        const players = getState().game.players;
        let currentPlayerIndex = getState().game.currentPlayerIndex
        let updatePlayer = players[currentPlayerIndex];
        let cost = getState().game.currentSquare.cost;

        if (updatePlayer.money - cost < 0) {
            return;
        }

        updatePlayer.money -= cost;
        let currentPosition = getState().game.currentPosition;
        updatePlayer.properties.push(currentPosition);

        let squares = getState().game.squares;
        squares[currentPosition].owned = `Player ${currentPlayerIndex + 1}`;
        squares[currentPosition].playerOwned = updatePlayer.name;
        
        dispatch(Creators.buyProperty(players, squares));
        dispatch(Creators.changeGameState(gameState.ON_OWN_PROPERTY, stateExitMap[gameState.ON_OWN_PROPERTY]));
    }
}

const payTax = () => {
    return (dispatch, getState) => {
        const players = getState().game.players;
        let updatePlayer = players[getState().game.currentPlayerIndex];
        updatePlayer.money -= getState().game.currentSquare.cost;
        dispatch(Creators.updatePlayers(players));  
        dispatch(Creators.changeGameState(gameState.END_OF_TURN, stateExitMap[gameState.END_OF_TURN]));
    }
}

const payRent = () => {
    return (dispatch, getState) => {
        const players = getState().game.players;
        let currentPosition = getState().game.currentPosition;
        let currentSquare = getState().game.currentSquare;
        let fromPlayer = players[getState().game.currentPlayerIndex];

        for (let i = 0; i < players.length; i++) {
            let toPlayer = players[i];
            if (toPlayer.properties.includes(currentPosition)) {
                fromPlayer.money -= currentSquare.rent[0];
                toPlayer.money += currentSquare.rent[0];
                dispatch(Creators.updatePlayers(players));  
                dispatch(Creators.changeGameState(gameState.END_OF_TURN, stateExitMap[gameState.END_OF_TURN]));
                return;
            }  
        }
    }
}

const getStartMoney = (players, updatePlayer) => {
    return (dispatch, getState) => {
        updatePlayer.money += getState().game.squares[0].cost;
        dispatch(Creators.updatePlayers(players));
    }
}

const drawCard = (type) => {
    return (dispatch) => {
        let card = {
            type: '',
            text: ''
        }
        if (type === exitCondition.DRAW_CHANCE) {
            card.text = cardData.chance[Math.floor(Math.random() * cardData.chance.length)];
            card.type = 'Chance';
        } else {
            card.text = cardData.chest[Math.floor(Math.random() * cardData.chest.length)];
            card.type = 'Community Chest';
        }

        dispatch(Creators.updateCard(card));
        dispatch(Creators.changeGameState(gameState.END_OF_TURN, stateExitMap[gameState.END_OF_TURN]));
    }
}

const completedCard = () => {
    return (dispatch) => {
        dispatch(Creators.updateCard({type: '', text: ''}));
    }
}

const goJail = (players, updatePlayer) => {
    return (dispatch, getState) => {
        updatePlayer.jailTurns += 1;
        updatePlayer.position = 10;
        dispatch(Creators.movePlayer(players, 10, getState().game.squares[10]));
        dispatch(Creators.changeGameState(gameState.IN_JAIL, stateExitMap[gameState.IN_JAIL]));
    }
}

const rollDice = () => {
    return (dispatch, getState) => {
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        dispatch(Creators.rollDice([dice1, dice2]));
        dispatch(Creators.changeGameState(gameState.ROLLING_DICE, stateExitMap[gameState.ROLLING_DICE]));

        setTimeout(() => {
            const players = getState().game.players;
            let updatePlayer = players[getState().game.currentPlayerIndex];
            let prevPosition = updatePlayer.position;
            let currentPosition = (prevPosition + dice1 + dice2) % NUMBER_POSITIONS;
            updatePlayer.position = currentPosition
            let currentSquare = getState().game.squares[currentPosition];
            dispatch(Creators.movePlayer(players, currentPosition, currentSquare));
            
            if (currentPosition < prevPosition) {
                dispatch(getStartMoney(players, updatePlayer));
            }
            
            let currentPlayer = getState().game.currentPlayer;
            if (currentSquare.subtype === 'tax') {
                dispatch(Creators.changeGameState(gameState.ON_TAX, stateExitMap[gameState.ON_TAX]));
            } else if (currentSquare.subtype === 'chest') {
                dispatch(Creators.changeGameState(gameState.ON_CHEST, stateExitMap[gameState.ON_CHEST]));
            } else if (currentSquare.subtype === 'chance') {
                dispatch(Creators.changeGameState(gameState.ON_CHANCE, stateExitMap[gameState.ON_CHANCE]));
            } else if (currentSquare.subtype === 'free-park') {
                dispatch(Creators.changeGameState(gameState.END_OF_TURN, stateExitMap[gameState.END_OF_TURN]));
            } else if (currentSquare.subtype === 'go-jail') {
                setTimeout(() => {
                    dispatch(goJail(players, updatePlayer));
                }, 1500);
            } else if (currentSquare.subtype === 'jail') {
                dispatch(Creators.changeGameState(gameState.END_OF_TURN, stateExitMap[gameState.END_OF_TURN]));
            } else if (currentSquare.subtype === 'start') {
                dispatch(Creators.changeGameState(gameState.END_OF_TURN, stateExitMap[gameState.END_OF_TURN]));
            } else {
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
            }  
        }, 1000);
    }
}

export default {
    endTurn,
    startGame,
    buyProperty,
    newGame,
    rollDice,
    payTax,
    drawCard,
    payRent,
    completedCard
};