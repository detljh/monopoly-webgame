import Creators from './actions.js';

const endTurn = Creators.endTurn;
const startGame = Creators.startGame;

const subtractMoney = (money) => {
    return (dispatch, getState) => {
        const players = [...getState().game.players];
        let updatePlayer = players[getState().game.currentPlayerIndex];
        updatePlayer.money = updatePlayer.money - money;
        dispatch(Creators.subtractMoney(players));  
    }
}

export default {
    endTurn,
    startGame,
    subtractMoney
};