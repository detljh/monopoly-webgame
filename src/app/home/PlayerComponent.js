import React from 'react';
import './player.scss';

const PlayerComponent = (props) => {
    return (
        <button className="player" id={props.id} onClick={() => props.addPlayer(props.id)}></button>
    );
}

export default PlayerComponent;