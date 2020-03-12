import React from 'react';
import './player.scss';

const PlayerComponent = (props) => {
    return (
        <button className="player player-button" id={props.id} onClick={() => props.action(props.id)}></button>
    );
}

export default PlayerComponent;