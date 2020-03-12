import React from 'react';

const SquareComponent = (props) => {
    return (
        <div className="square" id={`square-${props.id}`}>
            {
                props.square.owned &&
                <div className={`${props.square.type} owned-property`} id={props.square.playerOwned}>      
                </div> 
            }
            <div className={props.square.type}>
                <div id="player-on-square-container">
                    {
                        props.playersOnSquare.map(player => 
                            <div key={player} className="player-on-square player-icon" id={player}></div>
                        )
                    }
                </div>

                <p className="square-cost">{(props.square.type.includes("property") || ["tax", "station", "utility"].some(e => props.square.subtype.includes(e))) && `$${props.square.cost}`}</p>
                {props.freeParking > -1 && <p className="square-cost"><b>Amount:</b> {props.freeParking}</p>}
                <p className="square-name">{props.square.text}</p>
                <div className={props.square.subtype}>
                        {props.square.owned && (props.square.houses >= 0 &&
                        (props.square.houses < 5 ? <p className="owned-text">Houses: {props.square.houses}</p>
                        : <p className="owned-text">Hotel</p>))}
                </div>
            </div>
        </div>
    );
}

export default SquareComponent;