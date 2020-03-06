import React from 'react';

const SquareComponent = (props) => {
    return (
        <div className="square" id={`square-${props.id}`}>
            {
                props.owned &&
                <div className={`${props.type} owned-property`} id={props.playerOwned}>
                    <p>OWNED BY {props.owned}</p>
                </div> 
            }
            <div className={props.type}>
                <div id="player-on-square-container">
                    {
                        props.playersOnSquare.map(player => 
                            <div key={player} className="player-on-square player-icon" id={player}></div>
                        )
                    }
                </div>

                <p className="square-cost">{(props.type.includes("property") || ["tax", "station", "utility"].some(e => props.subtype.includes(e))) && `$${props.cost}`}</p>
                <p className="square-name">{props.text}</p>
                <div className={props.subtype}></div>
            </div>
        </div>
    );
}

export default SquareComponent;