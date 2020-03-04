import Creators from './actions.js';

const endTurn = Creators.endTurn;
const startGame = Creators.startGame;
const newGame = (ownProps) => {
    return (dispatch) => {
        dispatch(Creators.newGame());
        ownProps.history.push('/');
    }
}

const subtractMoney = (money) => {
    return (dispatch, getState) => {
        const players = [...getState().game.players];
        let updatePlayer = players[getState().game.currentPlayerIndex];
        updatePlayer.money = updatePlayer.money - money;
        dispatch(Creators.subtractMoney(players));  
    }
}

const rollDice = () => {
    return (dispatch) => {
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        dispatch(Creators.rollDice([dice1, dice2]));
    }
}

export default {
    endTurn,
    startGame,
    subtractMoney,
    newGame,
    rollDice
};