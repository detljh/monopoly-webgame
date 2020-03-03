import React from 'react';
import { Link } from 'react-router-dom';
import PlayerComponent from './PlayerComponent'; 
import './home.scss';

const HomeComponent = (props) => {
    return (
        <div id="home">
            <h1>Choose your players</h1>
            <PlayerComponent id="player-one" addPlayer={props.addPlayer} />
            <PlayerComponent id="player-two" addPlayer={props.addPlayer} />
            <PlayerComponent id="player-three" addPlayer={props.addPlayer} />
            <PlayerComponent id="player-four" addPlayer={props.addPlayer} />
            <div class="current-players">
                <h2>Current Players:</h2>
                {props.currentPlayers.map(element => 
                    <div class="player" id={element} />
                )}
            </div>
            <br></br>
            <Link to={'./board'}>
                <button onClick={props.startGame}>Start</button>
            </Link>
        </div>
    );
}

export default HomeComponent;