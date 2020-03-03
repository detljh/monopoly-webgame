import { combineReducers } from 'redux';
import homeReducer from './app/home/duck';
import gameReducer from './app/game/duck';

const rootReducer = combineReducers({
    home: homeReducer,
    game: gameReducer
});

export default rootReducer;