import React from 'react';
import Player from '../player/PlayerComponent'; 
import './home.scss';

const HomeComponent = (props) => {
    return (
        <div id="home-page" className="transition-item">
            <div id="page-title">
                <div id="before-title"></div>
                <h1>Monopoly</h1>
                <div id="after-title"></div>
            </div>

            <div id="home">
                <h2 id="sub-title">Choose your players</h2>
                <div>
                    <Player id="player-one" action={props.addPlayer} />
                    <Player id="player-two" action={props.addPlayer} />
                    <Player id="player-three" action={props.addPlayer} />
                    <Player id="player-four" action={props.addPlayer} />
                    <Player id="player-five" action={props.addPlayer} />
                    <Player id="player-six" action={props.addPlayer} />
                </div>

                <div id="current-players">
                    <h2>Current Players</h2>
                    <div className="current-player-container">
                        {props.currentPlayers.map((element, index) =>
                            <div key={element} className="current-player">
                                <span className="player-name">Player {index+1}</span>
                                <Player className="player" id={element} action={props.removePlayer} />
                            </div>
                        )}  
                    </div>
                </div>
                
                <button className="main-buttons" id="start-game" onClick={() => props.startGame(props.currentPlayers)}>Start Game</button>
            </div>
        </div>
    );
}

export default HomeComponent;