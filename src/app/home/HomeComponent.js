import React from 'react';
import { Link } from 'react-router-dom';
import Player from '../player/PlayerComponent'; 
import './home.scss';

const HomeComponent = (props) => {
    return (
        <div id="home">
            <h1>Choose your players</h1>
            <Player id="player-one" addPlayer={props.addPlayer} />
            <Player id="player-two" addPlayer={props.addPlayer} />
            <Player id="player-three" addPlayer={props.addPlayer} />
            <Player id="player-four" addPlayer={props.addPlayer} />
            <div className="current-players">
                <h2>Current Players:</h2>
                {props.currentPlayers.map((element, index) => 
                    <div key={index} className="player" id={element} />
                )}
            </div>
            <br></br>
            <Link to={'./game'}>
                <button onClick={() => props.startGame(props.currentPlayers)}>Start</button>
            </Link>
        </div>
    );
}

export default HomeComponent;