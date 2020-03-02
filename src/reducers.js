import { combineReducers } from 'redux';
import homeReducer from './app/home/duck';
import boardReducer from './app/board/duck';

const rootReducer = combineReducers({
    home: homeReducer,
    board: boardReducer
});

export default rootReducer;