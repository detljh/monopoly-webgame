import types from './types.js';


const data = require('../audio.json');
const INITIAL_STATE = {
    audioData: data
};

const homeReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case types.UPDATE_DISPLAY:
            return Object.assign({}, state, {
                currentDisplay: action.currentDisplay
            });
        case types.UPDATE_PAD_STYLE:
            return Object.assign({}, state, {
                padStyle: action.padStyle,
                activePad: action.activePad
            });
        default:       
            return state;
    };
};

export default homeReducer;