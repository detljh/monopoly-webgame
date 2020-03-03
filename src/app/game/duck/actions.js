import types from './types.js';

const updateDisplay = (name) => {
    return {
        type: types.UPDATE_DISPLAY,
        currentDisplay: name
    };
}

const updatePadStyle = (id, keyButton=id) => {
    return {
        type: types.UPDATE_PAD_STYLE,
        padStyle: id,
        activePad: keyButton
    };
}

export default { 
    updateDisplay,
    updatePadStyle
};