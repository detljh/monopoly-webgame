import React from 'react';

const SquareComponent = (props) => {
    return (
        <div className={props.type}>
            <div id="player-on-square-container">
                {
                    props.playersOnSquare.map(player => 
                        <div className="player-on-square player-icon" id={player}></div>
                    )
                }
            </div>

            <p className="square-cost">{props.type.includes("property") && `$${props.cost}`}</p>
            <p className="square-name">{props.text}</p>
            <div className={props.subtype}></div>
        </div>
    );
}

export default SquareComponent;