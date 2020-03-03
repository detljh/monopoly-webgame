import Creators from './actions.js';

const updateDisplay = Creators.updateDisplay;
const updatePadStyle = (keyButton) => {
    return (dispatch, getState) => {
        dispatch(Creators.updatePadStyle(keyButton + '-active', keyButton));
        setTimeout(() => {
            dispatch(Creators.updatePadStyle(keyButton));
        }, 100)
    }
}

export default {
    updateDisplay,
    updatePadStyle
};