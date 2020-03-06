import Creators from './actions.js';
import gameState from '../utilities/gameState.js';
import exitCondition from '../utilities/exitCondition.js';
import cardData from '../utilities/cardData';
import { propertyInfo } from '../utilities/boardSquareData';

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
    [gameState.IN_JAIL_FIRST_TURN]: [exitCondition.END_TURN],
    [gameState.IN_JAIL_BAIL_TURN]: [exitCondition.ROLL_DICE, exitCondition.PAY_BAIL, exitCondition.END_TURN]
};

const endTurn = () => {
    return (dispatch, getState) => {
        dispatch(Creators.endTurn());
        let players = getState().game.players;
        let currentPlayerIndex = getState().game.currentPlayerIndex;
        let currentPlayer = players[currentPlayerIndex];

        dispatch(updateDisplay(`Players ${currentPlayerIndex + 1}'s turn`));

        if (currentPlayer.jailTurns > 0 && currentPlayer.jailTurns < 4) {
            currentPlayer.jailTurns += 1;
            dispatch(Creators.updatePlayers(players));
            dispatch(Creators.changeGameState(gameState.IN_JAIL_BAIL_TURN, stateExitMap[gameState.IN_JAIL_BAIL_TURN]));
        } else if (currentPlayer.jailTurns >= 4) {
            dispatch(jailEscape());
        } else {
            dispatch(Creators.changeGameState(gameState.CHOOSING_ACTION, stateExitMap[gameState.CHOOSING_ACTION]));
        }

        dispatch(Creators.resetDice());
    }
};

const jailEscape = (cost=0) => {
    return (dispatch, getState) => {
        dispatch(updateDisplay("You've escaped the jail!"));
        let players = getState().game.players;
        let currentPlayerIndex = getState().game.currentPlayerIndex;
        let currentPlayer = players[currentPlayerIndex];

        currentPlayer.jailTurns = 0;
        currentPlayer.money -= cost;
        dispatch(Creators.updatePlayers(players));
        dispatch(Creators.changeGameState(gameState.CHOOSING_ACTION, stateExitMap[gameState.CHOOSING_ACTION]));
    }
}

const updateDisplay = (display) => {
    return (dispatch, getState) => {
        let currentDisplay = getState().game.display;
        if (currentDisplay.length > 0) {
            setTimeout(() => {
                dispatch(Creators.updateDisplay(display));
            }, 1000);
        } else {
            dispatch(Creators.updateDisplay(display));
        }
        
        setTimeout(() => {
            dispatch(Creators.updateDisplay(''));
        }, 2000);
    }
}

const startGame = (players) => {
    return (dispatch) => {
        players = players.map(player => {
            return {
                name: player,
                money: 1500,
                properties: [],
                position: 0,
                jailTurns: 0,
                // change to 0 in production
                rounds: 1,
                propertyNumbers: {
                    station: 0,
                    utility: 0,
                    brown: 0,
                    lightBlue: 0,
                    purple: 0,
                    orange: 0,
                    red: 0,
                    yellow: 0,
                    green: 0,
                    blue: 0
                }
            } 
        });
        dispatch(Creators.startGame(players));
        dispatch(updateDisplay("Player 1's turn"));
    }
} 

const newGame = (ownProps) => {
    return (dispatch) => {
        dispatch(Creators.newGame());
        ownProps.history.push('/');
    }
}

const endOfTurn = () => {
    return (dispatch, getState) => {
        const doubleDice = getState().game.doubleDice;
        let players = getState().game.players;
        let updatePlayer = players[getState().game.currentPlayerIndex];

        if (updatePlayer.jailTurns > 0) {
            if (doubleDice) {
                dispatch(jailEscape());
            } else {
                dispatch(Creators.changeGameState(gameState.END_OF_TURN, stateExitMap[gameState.END_OF_TURN]));
            }
        } else {
            if (doubleDice >= 3) {
                dispatch(updateDisplay("Three in a row Doubles! Moving to Jail!"));
                dispatch(Creators.resetDoubleDice());
                dispatch(goJail(players, updatePlayer));
            } else if (doubleDice > 0) {
                dispatch(Creators.changeGameState(gameState.CHOOSING_ACTION, stateExitMap[gameState.CHOOSING_ACTION]));
            } else {
                dispatch(Creators.resetDoubleDice());
                dispatch(Creators.changeGameState(gameState.END_OF_TURN, stateExitMap[gameState.END_OF_TURN]));
            }
        }
    }
}

const buyProperty = () => {
    return (dispatch, getState) => {
        const players = getState().game.players;
        let currentPlayerIndex = getState().game.currentPlayerIndex
        let updatePlayer = players[currentPlayerIndex];
        let currentSquare = getState().game.currentSquare;
        let cost = currentSquare.cost;

        if (updatePlayer.money - cost < 0) {
            return;
        }

        updatePlayer.money -= cost;
        let currentPosition = getState().game.currentPosition;
        updatePlayer.properties.push(currentPosition);

        let squares = getState().game.squares;
        squares[currentPosition].owned = `Player ${currentPlayerIndex + 1}`;
        squares[currentPosition].ownedIndex = currentPlayerIndex;
        squares[currentPosition].playerOwned = updatePlayer.name;

        updatePlayer.propertyNumbers[currentSquare.subtype] += 1;
        
        dispatch(Creators.buyProperty(players, squares));
        dispatch(endOfTurn());
    }
}

const payTax = () => {
    return (dispatch, getState) => {
        const players = getState().game.players;
        let updatePlayer = players[getState().game.currentPlayerIndex];
        updatePlayer.money -= getState().game.currentSquare.cost;
        dispatch(Creators.updatePlayers(players));  
        dispatch(endOfTurn());
    }
}

const payBail = () => {
    return (dispatch, getState) => {
        dispatch(jailEscape(50));
    }
}

const payRent = () => {
    return (dispatch, getState) => {
        const players = getState().game.players;
        let currentSquare = getState().game.currentSquare;
        let fromPlayer = players[getState().game.currentPlayerIndex];
        let toPlayer = players[currentSquare.ownedIndex];
        let subType = currentSquare.subtype;

        let rentStage = 0;
        let rent = 0;
        if (subType == 'utility') {
            rentStage = toPlayer.propertyNumbers[subType] - 1;
            let currentDice = getState().game.currentDice;
            rent = currentSquare.rent[rentStage] * (currentDice[0] + currentDice[1]);
        } else if (subType == 'station') {
            rentStage = toPlayer.propertyNumbers[subType] - 1;
            rent = currentSquare.rent[rentStage];
        } else {
            rentStage = toPlayer.propertyNumbers[subType] - propertyInfo[subType] + 1;
            rentStage = rentStage < 0 ? 0 : rentStage;
            rent = currentSquare.rent[rentStage];
        } 

        fromPlayer.money -= rent;
        toPlayer.money += rent;
        dispatch(Creators.updatePlayers(players));  
        dispatch(endOfTurn());
    }
}

const getStartMoney = (players, updatePlayer) => {
    return (dispatch, getState) => {
        dispatch(updateDisplay("Passing Go +$200!"));
        updatePlayer.rounds += 1;
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
        dispatch(endOfTurn());
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
        dispatch(Creators.changeGameState(gameState.IN_JAIL_FIRST_TURN, stateExitMap[gameState.IN_JAIL_FIRST_TURN]));
    }
}

const playerTurn = (dice1, dice2) => {
    return (dispatch, getState) => {
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
            dispatch(endOfTurn());
        } else if (currentSquare.subtype === 'go-jail') {
            dispatch(updateDisplay("Moving to Jail!"));
            setTimeout(() => {
                dispatch(goJail(players, updatePlayer));
            }, 1500);
        } else if (currentSquare.subtype === 'jail' || currentSquare.subtype === 'start') {
            dispatch(endOfTurn());
        } else {
            if (currentPlayer.rounds < 1) {
                dispatch(endOfTurn());
            } else {
                if (currentSquare.owned) {
                    let owner = players[currentSquare.ownedIndex];
                    if (owner.name == currentPlayer.name) {
                        dispatch(endOfTurn());
                    } else {
                        if (owner.jailTurns > 0) {
                            dispatch(endOfTurn());
                        } else {
                            dispatch(Creators.changeGameState(gameState.ON_OWNED_PROPERTY, stateExitMap[gameState.ON_OWNED_PROPERTY]));
                        }
                    }
                } else {
                    dispatch(Creators.changeGameState(gameState.ON_FREE_PROPERTY, stateExitMap[gameState.ON_FREE_PROPERTY]));
                }
            }
        }
    }
}

const buyHouse = () => {
    // save prev game state, change game state to buying house, show menu with available properties to buy house/hotel, have back button which reverts to prev game state, have buy button
}

const rollDice = () => {
    return (dispatch, getState) => {
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        dispatch(Creators.rollDice([dice1, dice2]));
        dispatch(Creators.changeGameState(gameState.ROLLING_DICE, stateExitMap[gameState.ROLLING_DICE]));

        let currentPlayer = getState().game.currentPlayer;
        if (dice1 == dice2) {
                dispatch(Creators.doubleDice());
                dispatch(updateDisplay("Doubles!"));
        } else {
            dispatch(Creators.resetDoubleDice());
        }
        
        if (currentPlayer.jailTurns == 0) {
            setTimeout(() => {
                dispatch(playerTurn(dice1, dice2));
            }, 1500);
        } else {
            dispatch(endOfTurn());
        }
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
    completedCard,
    payBail,
    buyHouse
};