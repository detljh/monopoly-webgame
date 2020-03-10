import Creators from './actions.js';
import gameState from '../utilities/gameState.js';
import exitCondition from '../utilities/exitCondition.js';
import cardData from '../utilities/cardData';
import { propertyInfo } from '../utilities/boardSquareData';

const NUMBER_POSITIONS = 40;
const MORTGAGE_RATE = 0.85;
const stateExitMap = {
    [gameState.CHOOSING_ACTION]: [exitCondition.ROLL_DICE, exitCondition.TRADE, exitCondition.BUY_HOUSE, exitCondition.MORTGAGE],
    [gameState.ROLLING_DICE]: [],
    [gameState.TRADING]: [],
    [gameState.ON_CHANCE]: [exitCondition.DRAW_CHANCE],
    [gameState.ON_CHEST]: [exitCondition.DRAW_CHEST],
    [gameState.ON_FREE_PROPERTY]: [exitCondition.BUY_PROPERTY, exitCondition.BUY_HOUSE, exitCondition.MORTGAGE, exitCondition.END_TURN],
    [gameState.ON_OWNED_PROPERTY]: [exitCondition.PAY_RENT, , exitCondition.MORTGAGE],
    [gameState.ON_OWN_PROPERTY]: [exitCondition.BUY_HOUSE, exitCondition.MORTGAGE, exitCondition.END_TURN],
    [gameState.ON_TAX]: [exitCondition.PAY_TAX, exitCondition.MORTGAGE],
    [gameState.END_OF_TURN]: [exitCondition.BUY_HOUSE, exitCondition.MORTGAGE, exitCondition.END_TURN],
    [gameState.IN_JAIL_FIRST_TURN]: [exitCondition.MORTGAGE, exitCondition.END_TURN],
    [gameState.IN_JAIL_BAIL_TURN]: [exitCondition.ROLL_DICE, exitCondition.PAY_BAIL, exitCondition.MORTGAGE],
    [gameState.IN_JAIL_BAIL_TURN_CARD]: [exitCondition.ROLL_DICE, exitCondition.USE_JAIL_CARD, exitCondition.PAY_BAIL, exitCondition.MORTGAGE],
    [gameState.BUYING_HOUSE]: [exitCondition.BUY_HOUSE_MENU],
    [gameState.MORTGAGING]: [exitCondition.MORTGAGE_MENU],
    [gameState.CARD]: [exitCondition.COMPLETE_CARD, exitCondition.MORTGAGE]
};

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
                },
                jailCard: 0
            } 
        });
        dispatch(Creators.startGame(players));
        dispatch(updateDisplay("Player 1's turn"));
    }
} 

/**
 * ESSENTIAL PLAYER MOVE FUNCTIONS
 */


const newGame = (ownProps) => {
    return (dispatch) => {
        dispatch(Creators.newGame());
        ownProps.history.push('/');
    }
}

const rollDice = () => {
    return (dispatch, getState) => {
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        // const dice1 = 1
        // const dice2 = 1
        dispatch(Creators.rollDice([dice1, dice2]));
        dispatch(Creators.changeGameState(gameState.ROLLING_DICE, stateExitMap[gameState.ROLLING_DICE]));

        let currentPlayer = getState().game.currentPlayer;
        if (dice1 == dice2) {
                dispatch(Creators.doubleDice());
                dispatch(updateDisplay("Doubles!"));
        } else {
            dispatch(Creators.resetDoubleDice());
        }

        let doubleDice = getState().game.doubleDice;

        if (doubleDice >= 3) {
            dispatch(updateDisplay("Three in a row Doubles! Moving to Jail!"));
            dispatch(Creators.resetDoubleDice());
            dispatch(goJail(getState().game.players, currentPlayer));
        } else if (currentPlayer.jailTurns == 0) {
            dispatch(playerTurn(dice1, dice2));
        } else {
            dispatch(endOfTurn());
        }
    }
}

const playerTurn = (dice1, dice2) => {
    return (dispatch, getState) => {
        const players = getState().game.players;
        let updatePlayer = players[getState().game.currentPlayerIndex];
        let prevPosition = updatePlayer.position;
        let currentPosition = (prevPosition + dice1 + dice2) % NUMBER_POSITIONS;
        //let currentPosition = 3;
        updatePlayer.position = currentPosition
        let currentSquare = getState().game.squares[currentPosition];
        dispatch(Creators.movePlayer(players, currentPosition));
        
        if (currentPosition < prevPosition) {
            dispatch(getStartMoney(players, updatePlayer));
        }

        setTimeout(() => {
            dispatch(checkProperty(currentSquare, players, updatePlayer));
        }, 1000);
    }
}

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
            
            if (currentPlayer.jailCard > 0) {
                dispatch(Creators.changeGameState(gameState.IN_JAIL_BAIL_TURN, stateExitMap[gameState.IN_JAIL_BAIL_TURN_CARD]));
            } else {
                dispatch(Creators.changeGameState(gameState.IN_JAIL_BAIL_TURN, stateExitMap[gameState.IN_JAIL_BAIL_TURN]));
            }
        } else if (currentPlayer.jailTurns >= 4) {
            dispatch(jailEscape());
        } else {
            dispatch(Creators.changeGameState(gameState.CHOOSING_ACTION, stateExitMap[gameState.CHOOSING_ACTION]));
        }

        dispatch(Creators.resetDice());
    }
};

const getStartMoney = (players, updatePlayer) => {
    return (dispatch, getState) => {
        dispatch(updateDisplay("Passing Go +$200!"));
        updatePlayer.rounds += 1;
        updatePlayer.money += getState().game.squares[0].cost;
        dispatch(Creators.updatePlayers(players));
    }
}

const getFreeParking = (players, updatePlayer) => {
    return (dispatch, getState) => {
        let freeParking = getState().game.freeParking;
        if (freeParking > 0) {
            dispatch(updateDisplay(`Free parking +${freeParking}!`));
            updatePlayer.money += freeParking;
            dispatch(Creators.updatePlayers(players));
            dispatch(Creators.updateFreeParking(0));
        }
        
        dispatch(endOfTurn());
    }
}

/**
 * OTHER HELPER FUNCTIONS
 */

const checkProperty = (currentSquare, players, updatePlayer) => {
    return (dispatch, getState) => {
        if (currentSquare.subtype === 'tax') {
            dispatch(Creators.changeGameState(gameState.ON_TAX, stateExitMap[gameState.ON_TAX]));
        } else if (currentSquare.subtype === 'chest') {
            dispatch(Creators.changeGameState(gameState.ON_CHEST, stateExitMap[gameState.ON_CHEST]));
        } else if (currentSquare.subtype === 'chance') {
            dispatch(Creators.changeGameState(gameState.ON_CHANCE, stateExitMap[gameState.ON_CHANCE]));
        } else if (currentSquare.subtype === 'free-park') {
            dispatch(getFreeParking(players, updatePlayer));
        } else if (currentSquare.subtype === 'go-jail') {
            dispatch(updateDisplay("Moving to Jail!"));
            setTimeout(() => {
                dispatch(goJail(players, updatePlayer));
            }, 500);
        } else if (currentSquare.subtype === 'jail' || currentSquare.subtype === 'start') {
            dispatch(endOfTurn());
        } else {
            if (updatePlayer.rounds < 1) {
                dispatch(endOfTurn());
            } else {
                if (currentSquare.owned) {
                    let owner = players[currentSquare.ownedIndex];
                    if (owner.name == updatePlayer.name) {
                        dispatch(endOfTurn());
                    } else {
                        if (owner.jailTurns > 0) {
                            dispatch(endOfTurn());
                        } else {
                            dispatch(Creators.changeGameState(gameState.ON_OWNED_PROPERTY, stateExitMap[gameState.ON_OWNED_PROPERTY]));
                        }
                    }
                } else {
                    let state = gameState.ON_FREE_PROPERTY;
                    let exitConditions = stateExitMap[state];
                    let doubleDice = getState().game.doubleDice;
                    if (doubleDice > 0) {
                        // pop last move (end turn)
                        exitConditions.pop();
                        exitConditions.push(exitCondition.ROLL_DICE);
                    }
                    dispatch(Creators.changeGameState(state, exitConditions));
                }
            }
        }
    }
}
const goPrevGameState = () => {
    return (dispatch, getState) => {
        let prevGameState = getState().game.prevGameState;
        dispatch(Creators.changeGameState(prevGameState, stateExitMap[prevGameState]));
    }
}

const updateDisplay = (display) => {
    return (dispatch, getState) => {
        let currentDisplay = getState().game.display;
        let timeout = 1000;
        if (currentDisplay.length > 0) {
            setTimeout(() => {
                dispatch(Creators.updateDisplay(display));
                setTimeout(() => {
                    dispatch(Creators.updateDisplay(''));
                }, timeout);
            }, 1000);
        } else {
            dispatch(Creators.updateDisplay(display));
            setTimeout(() => {
                dispatch(Creators.updateDisplay(''));
            }, timeout);
        }
    }
}

const endOfTurn = () => {
    return (dispatch, getState) => {
        const doubleDice = getState().game.doubleDice;
        let players = getState().game.players;
        let updatePlayer = players[getState().game.currentPlayerIndex];

        if (updatePlayer.jailTurns > 0) {
            if (doubleDice > 0) {
                dispatch(jailEscape());
                dispatch(Creators.resetDoubleDice());
            } else {
                dispatch(Creators.changeGameState(gameState.END_OF_TURN, stateExitMap[gameState.END_OF_TURN]));
            }
        } else {
            if (doubleDice > 0) {
                dispatch(Creators.changeGameState(gameState.CHOOSING_ACTION, stateExitMap[gameState.CHOOSING_ACTION]));
            } else {
                dispatch(Creators.resetDoubleDice());
                dispatch(Creators.changeGameState(gameState.END_OF_TURN, stateExitMap[gameState.END_OF_TURN]));
            } 
        }
    }
}

/**
 * JAIL FEATURE FUNCTIONS
 */

const goJail = (players, updatePlayer) => {
    return (dispatch) => {
        updatePlayer.jailTurns += 1;
        updatePlayer.position = 10;
        dispatch(Creators.movePlayer(players, 10));
        setTimeout(() => {
            dispatch(Creators.changeGameState(gameState.IN_JAIL_FIRST_TURN, stateExitMap[gameState.IN_JAIL_FIRST_TURN]));
        }, 1000);
    }
}

const jailEscape = (cost=0, card=false) => {
    return (dispatch, getState) => {
        dispatch(updateDisplay("You've escaped the jail!"));
        let players = getState().game.players;
        let currentPlayerIndex = getState().game.currentPlayerIndex;
        let currentPlayer = players[currentPlayerIndex];

        currentPlayer.jailTurns = 0;
        currentPlayer.money -= cost;
        if (card) {
            currentPlayer.jailCard -= 1;
        }

        dispatch(Creators.updatePlayers(players));
        dispatch(Creators.changeGameState(gameState.CHOOSING_ACTION, stateExitMap[gameState.CHOOSING_ACTION]));
    }
}

const payBail = () => {
    return (dispatch) => {
        dispatch(jailEscape(50));
    }
}

const useJailCard = () => {
    return (dispatch) => {
        dispatch(jailEscape(0, true))
    }
}

/**
 * CARD FEATURE FUNCTIONS
 */
const drawCard = (type) => {
    return (dispatch) => {
        let card = {};

        if (type === exitCondition.DRAW_CHANCE) {
            card = {...cardData.chance[Math.floor(Math.random() * cardData.chance.length)]};
            card.type = 'Chance';
        } else {
            card = {...cardData.chest[Math.floor(Math.random() * cardData.chest.length)]};
            card.type = 'Community Chest';
        }

        if (card.chance >= 0) {
            card.button = "Pay fine";
            card.drawChance = "Draw chance card";
        }

        dispatch(Creators.updateCard(card));
        dispatch(Creators.changeGameState(gameState.CARD, stateExitMap[gameState.CARD]));
    }
}

const completeCard = () => {
    return (dispatch, getState) => {
        let card = getState().game.card;
        const players = getState().game.players;
        let currentPlayerIndex = getState().game.currentPlayerIndex;
        let updatePlayer = players[currentPlayerIndex];
        let prevPosition =  updatePlayer.position;

        if (card.position >= 0) {
            if (card.position === 10) {
                dispatch(goJail(players, updatePlayer));
            } else {
                updatePlayer.position = card.position;
                dispatch(Creators.movePlayer(players, card.position));
                if (card.go === true && card.position < prevPosition) {
                    dispatch(getStartMoney(players, updatePlayer));
                }
                dispatch(checkProperty(getState().game.currentSquare, players, updatePlayer));
            }
        } else if (card.pay) {
            updatePlayer.money -= card.pay;
            dispatch(Creators.updatePlayers(players));
        } else if (card.receive) {
            updatePlayer.money += card.receive;
            dispatch(Creators.updatePlayers(players));
        } else if (card.jailCard) {
            updatePlayer.jailCard += 1;
            dispatch(Creators.updatePlayers(players));
        } else if (card.house && card.hotel) {
            let houses = 0;
            let hotels = 0;
            let squares = getState().game.squares;
            let properties = getFullStreetProperties(updatePlayer, squares)[0];
            
            properties.forEach(property => {
                let propertyHouses = squares[property].houses;
                if (propertyHouses === 5) {
                    hotels += 1;
                } else {
                    houses += propertyHouses;
                }
            });

            let cost = (houses * card.house) + (hotels * card.hotel);
            updatePlayer.money -= cost;
            dispatch(Creators.updatePlayers(players));
        } else if (card.back) {
            updatePlayer.position -= card.back;
            dispatch(Creators.movePlayer(players, updatePlayer.position));
            dispatch(checkProperty(getState().game.currentSquare, players, updatePlayer));
        } else if (card.player >= 0) {
            players.forEach(player => {
                if (player.name !== updatePlayer.name) {
                    updatePlayer.money += card.player;
                    player.money -= card.player;   
                }
            });

            dispatch(Creators.updatePlayers(players));
        } else if (card.chance >= 0) {
            updatePlayer.money -= card.chance;
            dispatch(Creators.updatePlayers(players));
        } else {
            dispatch(endOfTurn());
        }

        dispatch(Creators.updateCard({type: '', text: ''}));
    }
}

/**
 * BUYING HOUSE/HOTEL FEATURE
 */

const getFullStreetProperties = (currentPlayer, squares) => {
    let playerProperties = currentPlayer.properties;
    let fullStreetProperties = [];
    let buyHouseMenu = [];

    playerProperties.forEach(property => {
        if (property === 'station' || property === 'utility') {
            return;
        }

        let square = squares[property];
        let squareType = square.subtype;
        let propertyNumber = propertyInfo[squareType];
        let playerPropertyNumber = currentPlayer.propertyNumbers[squareType];
        let propertyDifference = playerPropertyNumber - propertyNumber;

        if (propertyDifference === 0) {
            fullStreetProperties.push(property);
            if (square.houses < 4) {
                buyHouseMenu.push({type: 'house', propertyPosition: property, name: square.text, cost: square.houseCost});
            } else if (square.houses >= 4 && square.houses < 5) {
                buyHouseMenu.push({type: 'hotel', propertyPosition: property, name: square.text, cost: square.houseCost});
            }
        }
    });

    return [fullStreetProperties, buyHouseMenu];
}

const buyHouseMenu = () => {
    return (dispatch, getState) => {
        let currentPlayer = getState().game.currentPlayer;
        let squares = getState().game.squares;
        let properties = getFullStreetProperties(currentPlayer, squares)[1];
        dispatch(Creators.updateMenu(properties));
        dispatch(Creators.changeGameState(gameState.BUYING_HOUSE, stateExitMap[gameState.BUYING_HOUSE]));
    }
}

const buyHouse = (property) => {
    return (dispatch, getState) => {
        if (!property) {
            return;
        }
        
        const players = getState().game.players;
        let currentPlayerIndex = getState().game.currentPlayerIndex;
        let updatePlayer = players[currentPlayerIndex];

        let squares = {...getState().game.squares};
        let current = {...squares[property]};
        if (updatePlayer.money  - current.houseCost < 0) {
            dispatch(updateDisplay("Not enough money!"));
            return;
        }

        current.houses += 1;
        updatePlayer.money -= current.houseCost;
        squares = Object.assign({}, squares, {
            [property]: current
        });

        dispatch(Creators.buyOrSell(players, squares));
        dispatch(Creators.updateMenu(getFullStreetProperties(updatePlayer, squares)[1]));    
    }
}

/**
 * MORTGAGING FEATURE
 */

const getStreet = (subtype, properties, squares) => {
    let street = [];
    properties.forEach(property => {
        let square = squares[property];
        if (square.subtype === subtype) {
            street.push(property);
        }
    });
    return street;
}

const getMortgageMenu = (currentPlayer, squares) => {
    let fullStreet = getFullStreetProperties(currentPlayer, squares)[0];
    let mortgageMenu = [];
    currentPlayer.properties.forEach(property => {
        let square = squares[property];
        let cost = Math.floor(square.cost * MORTGAGE_RATE);
        if (fullStreet.includes(property)) {
            if (square.houses < 5 && square.houses > 0) {
                cost = Math.floor(square.houseCost * MORTGAGE_RATE);
                mortgageMenu.push({type: 'house', propertyPosition: property, name: square.text, cost: cost})
                return;
            } else if (square.houses === 5) {
                cost = Math.floor(square.houseCost * MORTGAGE_RATE);
                mortgageMenu.push({type: 'hotel', propertyPosition: property, name: square.text, cost: cost})
                return;
            }

            let street = getStreet(square.subtype, fullStreet, squares);
            if (street.every(p => squares[p].houses === 0)) {
                mortgageMenu.push({type: 'property', propertyPosition: property, name: square.text, cost: cost})
            }
        } else {
            mortgageMenu.push({type: 'property', propertyPosition: property, name: square.text, cost: cost})
        }
    });
    return mortgageMenu;
}

const mortgageMenu = () => {
    return (dispatch, getState) => {
        let currentPlayer = getState().game.currentPlayer;
        let squares = getState().game.squares;
        let mortgageMenu = getMortgageMenu(currentPlayer, squares);

        dispatch(Creators.updateMenu(mortgageMenu));
        dispatch(Creators.changeGameState(gameState.MORTGAGING, stateExitMap[gameState.MORTGAGING]));
    }
}

const mortgage = (property) => {
    return (dispatch, getState) => {
        if (!property) {
            return;
        }
        
        const players = getState().game.players;
        let currentPlayerIndex = getState().game.currentPlayerIndex;
        let updatePlayer = players[currentPlayerIndex];

        let squares = {...getState().game.squares};
        let current = {...squares[property]};
        if (current.houses > 0) {
            current.houses -= 1;
            updatePlayer.money += Math.floor(current.houseCost * MORTGAGE_RATE);
        } else {
            current.owned = false;
            updatePlayer.money += Math.floor(current.cost * MORTGAGE_RATE);
            updatePlayer.properties.splice(updatePlayer.properties.indexOf(property), 1);
            updatePlayer.propertyNumbers[current.subtype] -= 1;
        }
        
        squares = Object.assign({}, squares, {
            [property]: current
        });

        dispatch(Creators.buyOrSell(players, squares));
        dispatch(Creators.updateMenu(getMortgageMenu(updatePlayer, squares)));  
    }
}

/**
 * OTHER BUYING/ PAYING FUNCTIONS
 */

const buyProperty = () => {
    return (dispatch, getState) => {
        const players = getState().game.players;
        let currentPlayerIndex = getState().game.currentPlayerIndex;
        let updatePlayer = players[currentPlayerIndex];
        let currentSquare = getState().game.currentSquare;
        let cost = currentSquare.cost;

        if (updatePlayer.money - cost < 0) {
            dispatch(updateDisplay('Not enough money!'));
            return;
        }

        updatePlayer.money -= cost;
        let currentPosition = getState().game.currentPosition;
        updatePlayer.properties.push(currentPosition);

        
        let squares = {...getState().game.squares};
        let current = {...squares[currentPosition]};
        current.owned = `Player ${currentPlayerIndex + 1}`;
        current.ownedIndex = currentPlayerIndex;
        current.playerOwned = updatePlayer.name;
        updatePlayer.propertyNumbers[currentSquare.subtype] += 1;
        squares = Object.assign({}, squares, {
            [currentPosition]: current
        });
        
        dispatch(Creators.buyOrSell(players, squares));
        dispatch(endOfTurn());
    }
}

const payTax = () => {
    return (dispatch, getState) => {
        const players = getState().game.players;
        let updatePlayer = players[getState().game.currentPlayerIndex];
        let cost = getState().game.currentSquare.cost;
        let freeParking = getState().game.freeParking + cost;
        if (updatePlayer.money - cost < 0) {
            dispatch(updateDisplay("Not enough money! Mortgage some properties!"));
            return;
        }
        updatePlayer.money -= cost;
        dispatch(Creators.updatePlayers(players));  
        dispatch(Creators.updateFreeParking(freeParking));
        dispatch(endOfTurn());
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
            rentStage = rentStage < 0 ? 0 : rentStage + currentSquare.houses;
            rent = currentSquare.rent[rentStage];
        } 

        if (fromPlayer.money - rent < 0) {
            dispatch(updateDisplay("Not enough money! Mortgage some properties!"));
            return;
        }
        
        fromPlayer.money -= rent;
        toPlayer.money += rent;
        dispatch(Creators.updatePlayers(players));  
        dispatch(endOfTurn());
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
    completeCard,
    payBail,
    buyHouseMenu,
    goPrevGameState,
    buyHouse,
    useJailCard,
    mortgageMenu,
    mortgage
};